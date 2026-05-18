// WPで使用
// 
import Masonry from 'masonry-layout';
export default class Gallery {

  constructor(){
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
    this.isLoading = false

    // SORT
    this.catSelect = document.querySelector('.js-category')
    this.sortBtns = document.querySelectorAll('.js-sortBtn')
    this.currentCat = 'all'
    this.currentSort = 'random'
  }

  init(){
    console.log('masonryUi init')
    if(!this.container) return

    this.masonryUi()
    this.bindLoadMore()
    this.bindSort()
    this.bindSortBtn()
    this.bindModal()
    this.updateSortBtn()
    this.fetchInspoPosts({ page: 1, reset: true })
  }

  // ------------------------------
  // 初期メイソンリー
  // ------------------------------
  masonryUi(){
    this.mm.add( this.cmd,
      (context) => {
        const { isPc, isSp } = context.conditions;
        this.msnry = new Masonry( this.container, {
          percentPosition: true,
          gutter: ".gutter-sizer",
          transitionDuration: 0,
        });        
      }
    );
  }

  // ------------------------------
  // ソート
  // ------------------------------
  bindSort() {
    if(!this.catSelect) return

    this.catSelect.addEventListener('change', () => {
      this.currentCat = this.catSelect.value || 'all'

      // ALLに戻したときは初期状態と同じRANDOM。
      // それ以外のカテゴリを選んだときはLATEST。
      this.currentSort = this.currentCat === 'all' ? 'random' : 'latest'
      this.currentPage = 1

      this.updateSortBtn()
      this.fetchInspoPosts({ page: 1, reset: true })
    })
  }

  bindSortBtn() {
    if(!this.sortBtns.length) return

    this.sortBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const sort = btn.dataset.sort
        if(!sort || sort === this.currentSort) return

        this.currentSort = sort
        this.currentPage = 1
        this.updateSortBtn()
        this.fetchInspoPosts({ page: 1, reset: true })
      })
    })
  }

  updateSortBtn() {
    if(!this.sortBtns.length) return

    this.sortBtns.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.sort === this.currentSort)
    })
  }

  // ------------------------------
  // LOAD MOREの実装
  // ------------------------------
  bindLoadMore() {
    if(!this.moreBtn) return

    this.moreBtn.addEventListener('click', () => {
      if(this.isLoading) return
      if(this.currentPage >= this.maxPages) return

      const nextPage = this.currentPage + 1

      this.fetchInspoPosts({
        page: nextPage,
        reset: false
      })
    })
  }
  // WPの一覧用データを取得
  async fetchInspoPosts({ page = 1, reset = false } = {}) {
    if(this.isLoading) return

    // phpで作成した独自API
    const params = new URLSearchParams({
      page: page,
      category: this.currentCat,
      sort: this.currentSort
    })
    const apiUrl = `/wp-json/field-labo/v1/inspo?${params.toString()}`
    console.log('[inspo api] request:', apiUrl)

    this.isLoading = true
    this.updateMoreBtn()

    try {
      const res = await fetch(apiUrl);

      if(!res.ok) {
        throw new Error(`API request failed: ${res.status}`)
      }

      const data = await res.json();

      console.log('[inspo api] response:', data)
      console.log('[inspo api] posts:', data.posts)
      console.log('[inspo api] max pages:', data.max_pages)

      this.currentPage = data.current_page
      this.maxPages = data.max_pages

      await this.renderPosts(data.posts, { reset })

    } catch( error ) {
      console.error('[inspo api] error:', error)
    } finally {
      this.isLoading = false
      this.updateMoreBtn()
    }
  }
  async renderPosts(posts, { reset = false } = {}) {
    const container = this.container
    const template = document.querySelector('#inspo-template')

    if(!container || !template) return

    if(reset) {
      container.querySelectorAll('.l-contents__item').forEach(item => item.remove())
    }
    ;(posts || []).forEach(post => {
      const clone = template.content.cloneNode(true)

      const btn = clone.querySelector('.js-modalOpen')
      const img = clone.querySelector('img')
      const ttl = clone.querySelector('.c-thumbnail__title p')

      if(btn) btn.dataset.post = post.id
      if(img) {
        img.src = post.image || ''
        img.alt = post.title || ''
      }
      if(ttl) ttl.textContent = post.title || ''

      container.appendChild(clone)
    })

    await this.waitImages(container)

    if(this.msnry) {
      this.msnry.reloadItems()
      this.msnry.layout()
    }

  }

  updateMoreBtn() {
    if(!this.moreBtn) return

    const shouldHide = this.currentPage >= this.maxPages

    this.moreBtn.disabled = this.isLoading || shouldHide
    this.moreBtn.style.display = shouldHide ? 'none' : ''
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
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('.js-modalOpen')
      
      if(openBtn && openBtn.dataset.id === 'inspoModal') {
        e.preventDefault()

        const modalId = openBtn.dataset.id
        const postId = openBtn.dataset.post
        if(!postId) return

        this.openModal(modalId,postId)
        return
      }

      const closeBg = e.target.closest('.js-modalClose')
      const isInsideContainer = e.target.closest('.modal__container')

      // 閉じる
      if(closeBg && closeBg.dataset.id === 'inspoModal' && !isInsideContainer) {
        const modalId = closeBg.dataset.id
        this.closeModal(modalId)
      }
    })
  }

  async openModal(modalId, postId) {
    console.log('[modal] open request:', { modalId, postId })

    // element
    const modal = document.getElementById(modalId)
    if(!modal) return

    const modalContent = modal.querySelector('.js-modalContent')
    if(!modalContent) return

    // モーダルの枠だけ表示
    modal.classList.add('is-active')
    modal.setAttribute('aria-hidden', 'false')
    modal.style.display = 'block'
    document.documentElement.classList.add('is-modal-open')

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
      modalContent.innerHTML = ''
      while(buffer.firstChild) {
        modalContent.appendChild(buffer.firstChild)
      }

      console.log('[modal] render complete')

    } catch(err) {
      clearTimeout(loadingTimer)
      console.error('[modal api] error:', err)
      this.showModalError(modalContent, '読み込みに失敗しました。時間をおいて再度お試しください。')
    }
  }
  closeModal(modalId) {
    const modal = document.getElementById(modalId)
    if(!modal) return

    // 中身をクリア
    const modalContent = modal.querySelector('.js-modalContent')
    if(modalContent) {
      modalContent.innerHTML = ''
    }

    // 非表示
    modal.classList.remove('is-active')
    modal.setAttribute('aria-hidden', 'true')
    modal.style.display = ''
    document.documentElement.classList.remove('is-modal-open')
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
    container.innerHTML = `
      <div class="modal-loading" aria-live="polite">
        <p class="modal-loading__text">Loading...</p>
      </div>
    `
  }

  // モーダル内エラー表示
  showModalError(container, message) {
    container.innerHTML = `
      <div class="modal-error" role="alert">
        <p class="modal-error__text">${message}</p>
      </div>
    `
  }

  // APIのデータを元にモーダル内に描画
  renderModal(data, container) {
    const template = document.querySelector('#inspo-modal-template')
    if(!template || !container) return

    const clone = template.content.cloneNode(true)

    // element
    const imgWrap = clone.querySelector('.main_img')
    const text = clone.querySelector('.text')
    const catWrap = clone.querySelector('.categorie_wrapper')
    const linksWrap = clone.querySelector('.links-wrapper')
    const linksList = clone.querySelector('.links')

    const imgTemplate = document.querySelector('#inspo-modal-img-template')
    const catTemplate = document.querySelector('#inspo-modal-category-template')
    const linkTemplate = document.querySelector('#inspo-modal-link-template')

    // テキスト
    if(text) text.textContent = data.text || ''

    // 画像
    if(data.images && imgTemplate && imgWrap) {
      data.images.forEach(img => {
        const imgClone = imgTemplate.content.cloneNode(true)
        const imgEl = imgClone.querySelector('img')
        if(imgEl) {
          imgEl.src = img
          imgEl.alt = data.title || ''
        }
        imgWrap.appendChild(imgClone)
      })
    }
    
    // カテゴリ
    if(data.categories && catTemplate && catWrap) {
      data.categories.forEach(cat => {
        const catClone = catTemplate.content.cloneNode(true)
        const catLink = catClone.querySelector('a')

        if(catLink) {
          catLink.href = cat.url || '#'
          catLink.textContent = cat.name || ''
        }

        catWrap.appendChild(catClone)
      })
    }

    // 関連記事
    if(data.links && data.links.length && linkTemplate && linksWrap && linksList) {
      linksWrap.hidden = false

      data.links.forEach(link => {
        const linkClone = linkTemplate.content.cloneNode(true)
        const linkText = linkClone.querySelector('.link_text')
        const linkBtn = linkClone.querySelector('.link_btn')

        if(linkText) linkText.textContent = `${link.title || ''}_${link.post_type || ''}`
        if(linkBtn) linkBtn.href = link.url || '#'

        linksList.appendChild(linkClone)
      })
    }

    container.innerHTML = ''
    container.appendChild(clone)
  }

}
