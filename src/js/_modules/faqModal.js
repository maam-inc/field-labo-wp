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
      const closeButton = e.target.closest(`.js-modalClose[data-id="${this.modalId}"]`);

      if (openButton) {
        const postId = openButton.dataset.post;
        if (!postId) return;
        this.open(postId)
        return;
      }

      if (closeButton) {
        this.close()
      }
    });
  }

  async open(postId) {
    console.log(postId)
    if(this.isFetching) return;

    this.isFetching = true;
    // loadingやるならここで
    // this.content.innerHTML = '<p>読み込み中です。</p>';
    this.content.innerHTML = '';
    // 開く処理 仮
    this.modal.classList.add('is-open')

    try {
      const res = await fetch(`/wp-json/field-labo/v1/faq/${postId}`);
      if(!res.ok) throw new Error('FAQ fetch failed');
      const data = await res.json();
      console.log(data)

      this.content.innerHTML = data.answer;

    } catch(err) {
      console.error(err);
      this.content.innerHTML = '<p>読み込みに失敗しました。</p>';
    } finally {
      this.isFetching = false;
    }
  }

  close() {
    this.modal.classList.remove('is-open');
    this.content.innerHTML = '';
  }
}
