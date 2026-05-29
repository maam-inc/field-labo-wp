export default class PageLoaded {
  static #instance = null;

  constructor() {
    if (PageLoaded.#instance) {
      return PageLoaded.#instance;
    }

    this.modalId = 'PageLoaded';
    this.modal = null;    // DOM用
    this.content = null;
    this.isFetching = false;

    PageLoaded.#instance = this;
  }

  static getInstance() {
    if (!PageLoaded.#instance) {
      PageLoaded.#instance = new PageLoaded();
    }
    return PageLoaded.#instance;
  }

  init(target = document.documentElement) {
    target.classList.add('is-loaded');
  }
}
