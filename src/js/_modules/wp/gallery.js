// WPで使用
// 
import Masonry from 'masonry-layout';
import CommonModal from '../commonModal';
import OrderCtrl from '../OrderCtrl';

export default class Gallery {

  constructor(){
    this.isRendered = false;
    this.mm = gsap.matchMedia();
    this.mq_sp = `(max-width: 767px)`;
    this.mq_pc = `(min-width: 768px)`;
    this.cmd = { isPc: this.mq_pc, isSp: this.mq_sp };

    this.container = document.querySelector('.js-masonry');
    this.msnry = null;

    // LOAD MORE
    this.moreBtn = document.querySelector('.js-load-more')
    this.currentPage = 1
    this.maxPages = 1
    this.hasMore = true
    this.isLoading = false

    // SORT
    this.catSelect = document.querySelectorAll('.js-category')
    this.currentCat = 'all'
    this.currentSort = 'random'

    // MODAL URL
    this.modalId = 'inspoModal'
    this.modalQueryKey = 'modal'
    this.isSyncingModalUrl = false
  }

  init(){
    console.log('masonryUi init')
    if(!this.container) return

    this.masonryInit()
    this.bindLoadMore()
    this.bindSort()
    this.bindOrder()
    this.bindModal()
    this.bindModalUrl()
    this.updateOrderBtn()
    this.openInitialModalFromUrl()
    this.fetchInspoPosts({ page: 1, reset: true })
  }

  // ------------------------------
  // 初期メイソンリー
  // ------------------------------
  masonryInit(){
    this.mm.add( this.cmd,
      (context) => {
        const { isPc, isSp } = context.conditions;
        this.msnry = new Masonry( this.container, {
          percentPosition: true,
          columnWidth: '.js-galleryItem',
          gutter: ".gutter-sizer",
          transitionDuration: 0,
        });        
      }
    );

    this.msnry.once('layoutComplete', () => {
      console.log('maisonty layoutComplete')
    })
  }

  // ------------------------------
  // ソート
  // ------------------------------
  bindSort() {
    if(!this.catSelect.length) return

    this.catSelect.forEach(select => {
      select.addEventListener('change', () => {
        this.updateSort(select.value)

        // const Anim = new OrderCtrl;
        // Anim.hideGalleryAnim(document.querySelector('.topContents__gallery'))
        this.fetchInspoPosts({ page: 1, reset: true })
      })
    })
  }

  updateSort(category = 'all') {
    this.currentCat = category || 'all'

    // ALLに戻したときは初期状態と同じRANDOM
    // それ以外のカテゴリを選んだときはLATEST
    this.currentSort = this.currentCat === 'all' ? 'random' : 'latest'
    this.currentPage = 1

    this.updateCatSelect()
    this.updateOrderBtn()
  }

  updateCatSelect() {
    if(!this.catSelect.length) return

    this.catSelect.forEach(select => {
      select.value = this.currentCat
    })
  }

  // ------------------------------
  // 並び替え
  // ------------------------------
  bindOrder() {
    // ソートボタンクリック時の処置
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.js-orderBtn')
      // console.log('bindOrder',btn)

      if(!btn) return

      const sort = btn.dataset.sort
      if(!sort || sort === this.currentSort) return

      this.currentSort = sort
      this.currentPage = 1
      
      this.updateOrderBtn()
      this.fetchInspoPosts({ page: 1, reset: true })
    })
  }

  updateOrderBtn() {
    // ソートボタンの状態切り替え
    const buttons = document.querySelectorAll('.js-orderBtn')
    if(!buttons.length) return

    buttons.forEach(btn => {
      const isActive = btn.dataset.sort === this.currentSort
      btn.classList.toggle('is-active', isActive)
      btn.classList.toggle('active', isActive)
    })
  }

  // ------------------------------
  // LOAD MOREの実装
  // ------------------------------
  bindLoadMore() {
    if(!this.moreBtn) return

    this.moreBtn.addEventListener('click', () => {
      if(this.isLoading) return
      if(!this.hasMore) return

      const nextPage = this.currentPage + 1

      this.fetchInspoPosts({
        page: nextPage,
        reset: false
      })
    })
  }
  updateMoreBtn() {
    if(!this.moreBtn) return

    const shouldHide = !this.hasMore

    this.moreBtn.disabled = this.isLoading || shouldHide
    this.moreBtn.style.display = shouldHide ? 'none' : ''
  }

  // ------------------------------
  // WPの一覧用データ loadmore,sort共通
  // ------------------------------
  // **** 取得 ****
  async fetchInspoPosts({ page = 1, reset = false } = {}) {
    if(this.isLoading) return

    // phpで作成した独自API
    const params = new URLSearchParams({
      page: page,
      category: this.currentCat,
      sort: this.currentSort
    })
    const loadedIds = this.getLoadedIds()

    if(!reset && loadedIds.length) {
      params.set('exclude', loadedIds.join(','))
    }

    const apiUrl = `/wp-json/field-labo/v1/inspo?${params.toString()}`
    // console.log('[inspo api] request:', apiUrl)

    this.isLoading = true
    this.updateMoreBtn()

    try {
      const res = await fetch(apiUrl);

      if(!res.ok) throw new Error(`API request failed: ${res.status}`)
      const data = await res.json();

      // console.log('[inspo api] response:', data)
      // console.log('[inspo api] posts:', data.posts)
      // console.log('[inspo api] max pages:', data.max_pages)

      this.currentPage = data.current_page
      this.maxPages = data.max_pages
      this.hasMore = Boolean(data.has_more)

      await this.renderPosts(data.posts, { reset })

    } catch( error ) {
      console.error('[inspo api] error:', error)
    } finally {
      this.isLoading = false
      this.updateMoreBtn()
    }
  }

  // **** 描画 ****
  async renderPosts(posts, { reset = false } = {}) {
    const container = this.container
    const template = document.querySelector('#inspo-template')

    if(!container || !template) return

    // リセット = 
    if(reset) {
      container.querySelectorAll('.js-galleryItem').forEach(item => item.remove())
    }
    const loadedIds = this.getLoadedIds()

    ;(posts || []).forEach(post => {
      if(loadedIds.includes(String(post.id))) return

      const clone = template.content.cloneNode(true)

      const item = clone.querySelector('.js-galleryItem')
      const btn = clone.querySelector('.js-modalOpen')
      const webPimg = clone.querySelector('source')
      const img = clone.querySelector('img')
      const ttl = clone.querySelector('.c-thumbnail__title')

      if(item) item.dataset.postId = post.id
      if(btn) btn.dataset.post = post.id
      if(img) {
        webPimg.srcset = `${post.image}.webp` || ''
        img.alt = post.title || ''
        if(post.image_width) img.width = post.image_width
        if(post.image_height) img.height = post.image_height
      }
      if(ttl) ttl.textContent = post.title || ''

      container.appendChild(clone)
    })

    await this.waitImages(container)

    if(this.msnry) {
      this.msnry.reloadItems()
      this.msnry.layout()
      
      // 初回以外は並び替えアニメーション
      if(this.isRendered) {
        const Anim = new OrderCtrl
        Anim.cardAppearAnim(document.querySelectorAll('.js-galleryItem'))
      } else {
        this.isRendered = true;
      }

      ScrollTrigger.refresh()
    }

  }

  // **** WPの一覧を描画 ****
  normalizeImage(image) {
    if(!image) {
      return { url: '', width: '', height: '' }
    }

    if(typeof image === 'string') {
      return { url: image, width: '', height: '' }
    }

    return {
      url: image.url || image.image || '',
      width: image.width || image.image_width || '',
      height: image.height || image.image_height || '',
    }
  }


  filterByCategory(category) {
    this.updateSort(category)
    this.fetchInspoPosts({ page: 1, reset: true })

    const contents = document.querySelector('#l-contents')
    if(contents) {
      contents.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  getLoadedIds() {
    return Array.from(this.container.querySelectorAll('[data-post-id]'))
      .map(item => item.dataset.postId)
      .filter(Boolean)
  }

  // 画像の読み込みを待つ
  waitImages(container) {
    const images = Array.from(container.querySelectorAll('img'))
    // const images = Array.from(container.querySelectorAll('.contents__inspo img'))

    if(!images.length) {
      return Promise.resolve()
    }

    return Promise.all(images.map(img => {
      if(img.complete) {
        return Promise.resolve()
      }

      return new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true })
        img.addEventListener('error', resolve, { once: true })
      })
    }))
  }


  // ------------------------------
  // MODAL クリックイベント
  // ------------------------------
  bindModal() {
    const modal = document.getElementById(this.modalId)
    if(!modal) return

    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('.js-modalOpen')
      
      if(openBtn && openBtn.dataset.id === this.modalId) {
        e.preventDefault()

        const modalId = openBtn.dataset.id
        const postId = openBtn.dataset.post
        if(!postId) return

        this.openModal(modalId, postId, { updateUrl: true })
        return
      }

      const tagLink = e.target.closest('.js-modalTag')

      if(tagLink && modal.contains(tagLink)) {
        const category = tagLink.dataset.category
        if(!category) return

        e.preventDefault()
        this.filterByCategory(category)
        this.closeModal({ updateUrl: true })
        return
      }

      const closeBtn = e.target.closest('.js-modalClose')

      // 閉じる
      if(closeBtn && modal.contains(closeBtn)) {
        this.closeModal({ updateUrl: true })
      }
    })
  }

  bindModalUrl() {
    window.addEventListener('popstate', () => {
      const postId = this.getModalPostIdFromUrl()

      this.isSyncingModalUrl = true

      if(postId) {
        this.openModal(this.modalId, postId)
      } else {
        this.closeModal()
      }

      this.isSyncingModalUrl = false
    })
  }

  openInitialModalFromUrl() {
    const postId = this.getModalPostIdFromUrl()
    if(!postId) return

    this.openModal(this.modalId, postId)
  }

  getModalPostIdFromUrl() {
    const params = new URLSearchParams(window.location.search)
    const value = params.get(this.modalQueryKey)

    if(value && /^\d+$/.test(value)) return value

    return ''
  }

  updateModalUrl(postId) {
    if(this.isSyncingModalUrl || !window.history || !window.history.pushState) return

    const url = new URL(window.location.href)

    url.searchParams.delete(this.modalQueryKey)

    if(postId) {
      url.searchParams.set(this.modalQueryKey, postId)
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`
    if(nextUrl === `${window.location.pathname}${window.location.search}${window.location.hash}`) return

    window.history.pushState({ modalPostId: postId || null }, '', nextUrl)
  }

  async openModal(modalId, postId, { updateUrl = false } = {}) {
    console.log('[modal] open request:', { modalId, postId })

    // element
    const modal = document.getElementById(modalId)
    if(!modal) return

    const modalContent = this.ensureModalContent(modal)
    if(!modalContent) return

    if(updateUrl) {
      this.updateModalUrl(postId)
    }

    // CommonModal.openModal() は display:none の解除までは行わないため、
    // WP側で非表示出力しているモーダルだけ先に表示状態へ戻す。
    // modal.style.display = 'block'
    // modal.setAttribute('aria-hidden', 'false')
    // document.documentElement.classList.add('is-modal-open')
    const ModalFunc = new CommonModal;
    ModalFunc.openModal(modal)

    // loadingの表示ルール：
    const loadingDelay = 500
    const minLoadingDuration = 1000
    let loadingShownAt = null

    const loadingTimer = setTimeout(() => {
      console.log('[modal] show loading')
      this.showModalLoading(modalContent)
      loadingShownAt = Date.now()
    }, loadingDelay)

    try {
      // 1. APIからモーダル用データを取得する
      const data = await this.fetchModalPost(postId)

      // 2. 本番表示前に、仮コンテナへDOM生成する。ここでまだ画面には表示しない。
      const buffer = document.createElement('div')
      this.renderModal(data, buffer)

      // 3. 仮コンテナ内の画像読み込み完了を待つ
      // API取得が終わっていても、画像が未読み込みならloading対象にする。
      console.log('[modal] wait images')
      await this.waitImages(buffer)
      console.log('[modal] images loaded')

      clearTimeout(loadingTimer)

      // loadingがすでに表示されている場合は、最低表示時間を満たすまで待つ
      if(loadingShownAt) {
        const loadingElapsed = Date.now() - loadingShownAt
        const remaining = minLoadingDuration - loadingElapsed

        console.log('[modal] loading elapsed:', loadingElapsed)

        if(remaining > 0) {
          console.log('[modal] wait minimum loading duration:', remaining)
          await this.wait(remaining)
        }
      }

      // 4. loadingまたは空の状態から、完成済みDOMへ差し替える
      this.clearModalContent(modalContent)
      while(buffer.firstChild) {
        this.appendModalContent(modalContent, buffer.firstChild)
      }

      console.log('[modal] render complete')

    } catch(err) {
      clearTimeout(loadingTimer)
      console.error('[modal api] error:', err)
      this.showModalError(modalContent, '読み込みに失敗しました。時間をおいて再度お試しください。')
    }
  }
  closeModal({ updateUrl = false } = {}) {
    const modal = document.getElementById(this.modalId)
    if(!modal) return

    if(updateUrl) {
      this.updateModalUrl('')
    }

    // closeボタンを残して中身だけクリア
    const modalContent = modal.querySelector('.js-modalContent')
    if(modalContent) {
      this.clearModalContent(modalContent)
    }

    // modal.setAttribute('aria-hidden', 'true')
    // document.documentElement.classList.remove('is-modal-open')
    const ModalFunc = new CommonModal;
    ModalFunc.closeModal(modal)
    // window.setTimeout(() => {
    //   if(modal.classList.contains('is-open')) return
    //   modal.style.display = 'none'
    // }, 220)
  }

  ensureModalContent(modal) {
    const currentContent = modal.querySelector('.js-modalContent')
    if(currentContent) return currentContent

    const modalInner = modal.querySelector('.l-modal__inner')
    if(!modalInner) return null

    modalInner.classList.add('js-modalContent')

    return modalInner
  }

  clearModalContent(container) {
    Array.from(container.childNodes).forEach(node => {
      if(node.nodeType === Node.ELEMENT_NODE && node.classList.contains('l-modal__bottom')) return
      node.remove()
    })
  }

  appendModalContent(container, node) {
    const bottomBtn = container.querySelector('.l-modal__bottom')
    container.insertBefore(node, bottomBtn || null)
  }

  setModalContentHtml(container, html) {
    this.clearModalContent(container)
    const bottomBtn = container.querySelector('.l-modal__bottom')
    if(bottomBtn) {
      bottomBtn.insertAdjacentHTML('beforebegin', html)
      return
    }

    container.insertAdjacentHTML('beforeend', html)
  }

  // WPのモーダル用データを取得
  async fetchModalPost(postId, container) {
    const apiUrl = `/wp-json/field-labo/v1/inspo/${postId}`
    console.log('[modal api] request:', apiUrl)
    const res = await fetch(apiUrl)
    if(!res.ok) {
      throw new Error(`API request failed: ${res.status}`)
    }

    const data = await res.json();
    console.log('[modal api] response:', data)
    return data
    // try {
    //   const res = await fetch(apiUrl)
    //   if(!res.ok) {
    //     throw new Error(`API request failed: ${res.status}`)
    //   }

    //   const data = await res.json();
    //   console.log('[modal api] response:', data)
    //   this.renderModal(data,container)

    // } catch(err) {
    //   console.error('[modal api] error:', err)
    // }
  }

  // 指定ミリ秒だけ待つためのPromise
  // loadingを最低1秒表示したいときなどに使う
  wait(duration) {
    return new Promise(resolve => {
      setTimeout(resolve, duration)
    })
  }

  // モーダル内loading表示
  // アニメーションは後からCSSで追加する想定
  showModalLoading(container) {
    this.setModalContentHtml(container, `
      <div class="modal-loading" aria-live="polite">
        <p class="modal-loading__text">Loading...</p>
      </div>
    `)
  }

  // モーダル内エラー表示
  showModalError(container, message) {
    this.setModalContentHtml(container, `
      <div class="modal-error" role="alert">
        <p class="modal-error__text">${message}</p>
      </div>
    `)
  }

  // APIのデータを元にモーダル内に描画
  renderModal(data, container) {
    const template = document.querySelector('#inspo-modal-template')
    if(!template || !container) return

    const clone = template.content.cloneNode(true)

    // 画像
    const imgWrap = clone.querySelector('.js-images')
    const imgTemplate = document.querySelector('#inspo-modal-img-template')
    if(data.images && imgTemplate && imgWrap) {
      data.images.forEach(image => {
        const img = this.normalizeImage(image)
        if(!img.url) return

        const imgClone = imgTemplate.content.cloneNode(true)
        const imgEl = imgClone.querySelector('img')
        const webPEl = imgClone.querySelector('source')
        if(imgEl) {
          webPEl.srcset = `${img.url}.webp`
          imgEl.src = img.url
          imgEl.alt = data.title || ''
          if(img.width) imgEl.width = img.width
          if(img.height) imgEl.height = img.height
        }
        imgWrap.appendChild(imgClone)
      })
    }

    // テキスト
    const text = clone.querySelector('.js-text')
    if(text) {
      if(data.text != '') {
        text.textContent = data.text || ''
      } else {
        text.style.display = 'none'
      }
    }
    

    // カテゴリ
    const tagContainer = clone.querySelector('.js-tagContainer')
    const tagWrap = clone.querySelector('.js-tagWrapper')
    const tagTemplate = document.querySelector('#inspo-modal-tag-template')
    const categories = Array.isArray(data.categories) ? data.categories : []

    if(categories.length && tagTemplate && tagWrap) {
      categories.forEach(cat => {
        const catClone = tagTemplate.content.cloneNode(true)
        const catLink = catClone.querySelector('a')

        if(catLink) {
          catLink.href = cat.url || '#'
          catLink.textContent = cat.name || ''
          catLink.classList.add('js-modalTag')
          if(cat.slug) catLink.dataset.category = cat.slug
        }

        tagWrap.appendChild(catClone)
      })
    } else {
      tagContainer.style.display = 'none'
    }

    // 関連記事
    const articleContainer = clone.querySelector('.js-articleContainer')
    const articleWrap = clone.querySelector('.js-articleWrapper')
    const articleTemplate = document.querySelector('#inspo-modal-article-template')

    if(data.links && data.links.length && articleTemplate && articleWrap) {
      // linksWrap.hidden = false

      data.links.forEach(link => {
        const linkClone = articleTemplate.content.cloneNode(true)
        const linkText = linkClone.querySelector('.related_article-text p')
        const linkBtn = linkClone.querySelector('.related_article-inner')
        const genre = linkClone.querySelector('.related_article-genre')

        if(linkText) linkText.textContent = `${link.title || ''}`
        if(linkBtn) linkBtn.href = link.url || '#'
        if(genre) genre.textContent = `(${link.post_type || ''})`

        articleWrap.appendChild(linkClone)
      })
    } else {
      articleContainer.style.display = 'none'
    }

    container.innerHTML = ''
    container.appendChild(clone)
  }

}
