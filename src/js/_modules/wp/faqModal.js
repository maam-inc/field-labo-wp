export default class FaqModal {
  static #instance = null;

  constructor() {
    if (FaqModal.#instance) {
      return FaqModal.#instance;
    }

    this.modalId = 'faqModal';
    this.modal = null;    // DOM用
    this.content = null;
    this.isFetching = false;
    this.modalRequestId = 0;

    FaqModal.#instance = this;
  }

  static getInstance() {
    if (!FaqModal.#instance) {
      FaqModal.#instance = new FaqModal();
    }
    return FaqModal.#instance;
  }

  init() {
    console.log('faqModal init')
    
    // ELEMENT
    this.modal = document.getElementById(this.modalId);
    if (!this.modal) return;
    this.content = this.modal.querySelector('.js-modalContent');
    if (!this.content) return;

    // CLICK EVENT
    document.addEventListener('click', (e) => {
      console.log('click')
      const openButton = e.target.closest(`.js-modalOpen[data-id="${this.modalId}"]`);
      const closeButton = e.target.closest('.js-modalClose');

      if (openButton) {
        const postId = openButton.dataset.post;
        if (!postId) return;
        this.open(postId)
        return;
      }

      if (closeButton && this.modal.contains(closeButton)) {
        this.close()
      }
    });
  }

  async open(postId) {
    // console.log(postId)
    if(this.isFetching) return;

    this.isFetching = true;
    this.clearModalContent();

    // is-openで背景、is-loadingでローディングを先に表示する。
    const minLoadingDuration = 600;
    const loadingStartedAt = Date.now();
    const requestId = ++this.modalRequestId;
    this.openModalFrame();

    try {
      const res = await fetch(`/wp-json/field-labo/v1/faq/${postId}`);
      if(!res.ok) throw new Error('FAQ fetch failed');
      const data = await res.json();
      if(!this.isCurrentModalRequest(requestId)) return;
      console.log(data)

      this.setModalContentHtml(data.answer);
      await this.waitImages(this.content);
      if(!this.isCurrentModalRequest(requestId)) return;

      const loadingElapsed = Date.now() - loadingStartedAt;
      const remaining = minLoadingDuration - loadingElapsed;

      if(remaining > 0) {
        await this.wait(remaining);
      }
      if(!this.isCurrentModalRequest(requestId)) return;

      // is-loadedでモーダル内部を表示し、表示アニメーション後にloadingを外す。
      await this.showModalLoaded();

    } catch(err) {
      if(!this.isCurrentModalRequest(requestId)) return;

      console.error(err);
      this.setModalContentHtml('<p>読み込みに失敗しました。</p>');
      await this.showModalLoaded();
    } finally {
      this.isFetching = false;
    }
  }

  close() {
    this.closeModalFrame();
    this.modalRequestId += 1;
    const closeRequestId = this.modalRequestId;
    this.isFetching = false;

    // 閉じるアニメーション後に中身を消す。閉じている途中で再度開いた場合は消さない。
    window.setTimeout(() => {
      if(!this.isCurrentModalRequest(closeRequestId)) return;
      if(this.modal.classList.contains('is-open')) return;

      this.clearModalContent();
    }, 300);
  }

  openModalFrame() {
    if(!this.modal) return;

    const modalInner = this.modal.querySelector('.l-modal__wrapper');

    this.modal.classList.remove('is-loaded');
    this.modal.classList.add('is-open');
    this.modal.classList.add('is-loading');
    document.body.style.overflow = 'hidden';
    this.modal.scrollTop = 0;
    if(modalInner) modalInner.scrollTop = 0;
  }

  async showModalLoaded() {
    if(!this.modal) return;

    const modalInner = this.modal.querySelector('.l-modal__wrapper');

    this.modal.classList.add('is-loaded');
    this.modal.scrollTop = 0;
    if(modalInner) modalInner.scrollTop = 0;

    await this.wait(300);
    this.modal.classList.remove('is-loading');
  }

  closeModalFrame() {
    if(!this.modal) return;

    this.modal.classList.remove('is-loaded');
    this.modal.classList.remove('is-loading');
    this.modal.classList.remove('is-open');
    document.body.style.overflow = 'auto';
  }

  isCurrentModalRequest(requestId) {
    return requestId === this.modalRequestId;
  }

  wait(duration) {
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  }

  waitImages(container) {
    const images = Array.from(container.querySelectorAll('img'));

    if(!images.length) {
      return Promise.resolve();
    }

    return Promise.all(images.map(img => {
      if(img.complete) {
        return Promise.resolve();
      }

      return new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    }));
  }

  clearModalContent() {
    Array.from(this.content.childNodes).forEach(node => {
      if(node.nodeType === Node.ELEMENT_NODE && node.classList.contains('l-modal__bottom')) return;
      node.remove();
    });
  }

  setModalContentHtml(html) {
    this.clearModalContent();

    const bottomBtn = this.content.querySelector('.l-modal__bottom');
    if(bottomBtn) {
      bottomBtn.insertAdjacentHTML('beforebegin', html);
      return;
    }

    this.content.insertAdjacentHTML('beforeend', html);
  }
}
