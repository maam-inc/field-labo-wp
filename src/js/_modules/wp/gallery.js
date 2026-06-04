// WPで使用
// 
import Masonry from 'masonry-layout';
import OrderCtrl from '../OrderCtrl';
import PageLoaded from './pageLoaded'

export default class Gallery {

  constructor(){
    // 初回描画済みかどうか。2回目以降だけカード出現アニメーションを走らせる。
    this.isRendered = false;

    // MasonryのレイアウトをSP/PCのメディアクエリ単位で初期化する。
    this.mm = gsap.matchMedia();
    this.mq_sp = `(max-width: 767px)`;
    this.mq_pc = `(min-width: 768px)`;
    this.cmd = { isPc: this.mq_pc, isSp: this.mq_sp };

    // ギャラリー本体。ここにAPIで取得した投稿カードを追加していく。
    this.container = document.querySelector('.js-masonry');
    this.msnry = null;

    // LOAD MORE
    // 一覧APIのページング状態。連打や重複取得を防ぐためにisLoadingも持つ。
    this.moreBtn = document.querySelector('.js-load-more')
    this.currentPage = 1
    this.maxPages = 1
    this.hasMore = true
    this.isLoading = false

    // SORT
    // カテゴリと並び順の現在値。APIリクエスト時のパラメータになる。
    this.catSelect = document.querySelectorAll('.js-category')
    this.currentCat = 'all'
    this.currentSort = 'random'

    // MODAL URL
    // modal=投稿ID をURLに持たせ、直リンク/ブラウザ戻る進むとモーダルを同期する。
    this.modalId = 'inspoModal'
    this.modalQueryKey = 'modal'
    this.isSyncingModalUrl = false
    this.modalRequestId = 0
  }

  init(){
    console.log('masonryUi init')
    if(!this.container) return

    // イベント登録と初期表示をまとめて実行する。
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
        // 画像サイズに応じてカードを詰めるMasonryレイアウトを作成する。
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
      PageLoaded.getInstance().init();
    })
  }

  // ------------------------------
  // ソート
  // ------------------------------
  bindSort() {
    if(!this.catSelect.length) return

    this.catSelect.forEach(select => {
      select.addEventListener('change', () => {
        // カテゴリ変更時は1ページ目から取り直す。
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

    // 同じカテゴリUIが複数あっても状態をそろえる。
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
      
      // 並び順変更時も現在の一覧を破棄して1ページ目から取り直す。
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

      ScrollTrigger.refresh()
    })
  }
  updateMoreBtn() {
    if(!this.moreBtn) return

    const shouldHide = !this.hasMore

    // 読み込み中は連打防止、最終ページまで来たらボタン自体を非表示にする。
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

    // Load more時は既に画面にある投稿IDを除外して、ランダム取得でも重複を避ける。
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

      // reset=trueなら一覧差し替え、falseなら末尾に追加する。
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

    // リセット時は現在表示中のカードを全削除して、新しい条件の一覧に差し替える。
    if(reset) {
      container.querySelectorAll('.js-galleryItem').forEach(item => item.remove())
    }
    const loadedIds = this.getLoadedIds()
    const addedItems = []

    ;(posts || []).forEach(post => {
      // 既に描画済みの投稿は追加しない。
      if(loadedIds.includes(String(post.id))) return

      const clone = template.content.cloneNode(true)

      const item = clone.querySelector('.js-galleryItem')
      const btn = clone.querySelector('.js-modalOpen')
      const webPimg = clone.querySelector('source')
      const img = clone.querySelector('img')
      const ttl = clone.querySelector('.c-thumbnail__title')

      if(item) item.dataset.postId = post.id
      if(item) addedItems.push(item)
      if(btn) btn.dataset.post = post.id
      if(img) {
        // 一覧カードの画像とタイトルをAPIレスポンスで埋める。
        webPimg.srcset = `${post.image}.webp` || ''
        img.src = post.image || ''
        img.alt = post.title || ''
        if(post.image_width) img.width = post.image_width
        if(post.image_height) img.height = post.image_height
      }
      if(ttl) ttl.textContent = post.title || ''

      container.appendChild(clone)
    })

    await this.waitImages(container)

    if(this.msnry) {
      // 画像読み込み後にMasonryへ新しいカードを認識させて再配置する。
      this.msnry.reloadItems()
      this.msnry.layout()
      
      // 初回以外は並び替えアニメーション
      if(this.isRendered) {
        const Anim = new OrderCtrl

        // 今回のAPIレスポンスで追加したカードだけをアニメーション対象にする。
        Anim.cardAppearAnim(addedItems)
      } else {
        this.isRendered = true;
      }

      ScrollTrigger.refresh()
    }

  }

  // **** WPの一覧を描画 ****
  normalizeImage(image) {
    // モーダルAPIの画像データは文字列/オブジェクト両方を許容して同じ形にそろえる。
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
    // モーダル内タグクリック用。選択カテゴリで一覧を更新して、一覧位置へ戻す。
    this.updateSort(category)
    this.fetchInspoPosts({ page: 1, reset: true })

    const contents = document.querySelector('#l-contents')
    if(contents) {
      contents.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  getLoadedIds() {
    // DOM上のdata-post-idから、現在表示済みの投稿IDだけを集める。
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
      // キャッシュ済み画像はloadイベントが発火しないため、そのまま完了扱いにする。
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
      // 一覧カードのクリックで、投稿IDに対応するモーダル内容をAPIから取得して開く。
      const openBtn = e.target.closest('.js-modalOpen')
      
      if(openBtn && openBtn.dataset.id === this.modalId) {
        e.preventDefault()

        const modalId = openBtn.dataset.id
        const postId = openBtn.dataset.post
        if(!postId) return

        this.openModal(modalId, postId, { updateUrl: true })
        return
      }

      // モーダル内カテゴリタグをクリックしたら、そのカテゴリで一覧を絞り込む。
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
      // ブラウザの戻る/進むでURLが変わったとき、modalクエリに合わせて表示を同期する。
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
    // 初期表示時に ?modal=投稿ID があれば、該当投稿のモーダルを直接開く。
    const postId = this.getModalPostIdFromUrl()
    if(!postId) return

    this.openModal(this.modalId, postId)
  }

  getModalPostIdFromUrl() {
    const params = new URLSearchParams(window.location.search)
    const value = params.get(this.modalQueryKey)

    // 投稿IDとして扱える数字だけを許可する。
    if(value && /^\d+$/.test(value)) return value

    return ''
  }

  updateModalUrl(postId) {
    if(this.isSyncingModalUrl || !window.history || !window.history.pushState) return

    const url = new URL(window.location.href)

    // 既存のmodalクエリを一度消してから、必要な場合だけ新しい投稿IDをセットする。
    url.searchParams.delete(this.modalQueryKey)

    if(postId) {
      url.searchParams.set(this.modalQueryKey, postId)
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`
    if(nextUrl === `${window.location.pathname}${window.location.search}${window.location.hash}`) return

    // ページ遷移はせず、URLだけを更新する。
    window.history.pushState({ modalPostId: postId || null }, '', nextUrl)
  }

  async openModal(modalId, postId, { updateUrl = false } = {}) {
    console.log('[modal] open request:', { modalId, postId })

    // element
    const modal = document.getElementById(modalId)
    if(!modal) return

    const modalContent = this.ensureModalContent(modal)
    if(!modalContent) return

    // is-openで背景、is-loadingでローディングを先に表示する。
    const minLoadingDuration = 600
    const loadingStartedAt = Date.now()
    const requestId = ++this.modalRequestId
    this.openModalFrame(modal)

    try {
      // 1. APIからモーダル用データを取得する
      const data = await this.fetchModalPost(postId)
      if(!this.isCurrentModalRequest(requestId)) return

      // 2. 非表示状態のモーダルへDOMを差し込む
      this.clearModalContent(modalContent)
      this.renderModal(data, modalContent)

      // 3. 差し込んだ画像の読み込み完了を待ってからモーダルを開く
      console.log('[modal] wait images')
      await this.waitImages(modalContent)
      if(!this.isCurrentModalRequest(requestId)) return
      console.log('[modal] images loaded')

      const loadingElapsed = Date.now() - loadingStartedAt
      const remaining = minLoadingDuration - loadingElapsed

      if(remaining > 0) {
        await this.wait(remaining)
      }
      if(!this.isCurrentModalRequest(requestId)) return

      if(updateUrl) {
        this.updateModalUrl(postId)
      }

      // is-loadedでモーダル内部を表示し、表示アニメーション後にloadingを外す。
      await this.showModalLoaded(modal)

      // console.log('[modal] render complete')

    } catch(err) {
      if(!this.isCurrentModalRequest(requestId)) return

      console.error('[modal api] error:', err)
      this.showModalError(modalContent, '読み込みに失敗しました。時間をおいて再度お試しください。')
      await this.showModalLoaded(modal)
    }
  }

  closeModal({ updateUrl = false } = {}) {
    const modal = document.getElementById(this.modalId)
    if(!modal) return

    // 通常の閉じる操作ではURLからmodalクエリも外す。
    if(updateUrl) {
      this.updateModalUrl('')
    }

    this.closeModalFrame(modal)
    this.modalRequestId += 1
    const closeRequestId = this.modalRequestId

    // 閉じるアニメーション後に中身を消す。閉じている途中で再度開いた場合は消さない。
    window.setTimeout(() => {
      if(!this.isCurrentModalRequest(closeRequestId)) return
      if(modal.classList.contains('is-open')) return

      const modalContent = modal.querySelector('.js-modalContent')
      if(modalContent) {
        this.clearModalContent(modalContent)
      }
    }, 300)
  }

  openModalFrame(modal) {
    if(!modal) return

    const modalInner = modal.querySelector('.l-modal__wrapper')

    modal.classList.remove('is-loaded')
    modal.classList.add('is-open')
    modal.classList.add('is-loading')
    document.body.style.overflow = 'hidden'
    modal.scrollTop = 0
    if(modalInner) modalInner.scrollTop = 0
  }

  async showModalLoaded(modal) {
    if(!modal) return

    const modalInner = modal.querySelector('.l-modal__wrapper')

    modal.classList.add('is-loaded')
    modal.scrollTop = 0
    if(modalInner) modalInner.scrollTop = 0

    await this.wait(300)
    modal.classList.remove('is-loading')
  }

  closeModalFrame(modal) {
    if(!modal) return

    modal.classList.remove('is-loaded')
    modal.classList.remove('is-loading')
    modal.classList.remove('is-open')
    document.body.style.overflow = 'auto'
  }

  isCurrentModalRequest(requestId) {
    return requestId === this.modalRequestId
  }

  ensureModalContent(modal) {
    // 既存HTMLに.js-modalContentがなければ、モーダル内側を差し込み先として使う。
    const currentContent = modal.querySelector('.js-modalContent')
    if(currentContent) return currentContent

    const modalInner = modal.querySelector('.l-modal__inner')
    if(!modalInner) return null

    modalInner.classList.add('js-modalContent')

    return modalInner
  }

  clearModalContent(container) {
    // 閉じるボタンなどの固定下部エリアは残し、APIで差し込んだ内容だけ削除する。
    Array.from(container.childNodes).forEach(node => {
      if(node.nodeType === Node.ELEMENT_NODE && node.classList.contains('l-modal__bottom')) return
      node.remove()
    })
  }

  appendModalContent(container, node) {
    // 固定下部エリアがあれば、その直前に本文を差し込む。
    const bottomBtn = container.querySelector('.l-modal__bottom')
    container.insertBefore(node, bottomBtn || null)
  }

  setModalContentHtml(container, html) {
    // ローディング/エラー表示など、テンプレートを使わない簡易表示用。
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
    // 複数画像を画像用テンプレートで追加する。
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
    // カテゴリタグはクリックで一覧絞り込みに使うため、slugをdata-categoryへ持たせる。
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
    // 関連記事がない場合はセクションごと非表示にする。
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

    // 生成したモーダル本文を、固定下部エリアの前へ反映する。
    this.clearModalContent(container)
    this.appendModalContent(container, clone)
  }

}
