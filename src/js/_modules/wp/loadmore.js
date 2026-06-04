import LoadMoreAnim from '../LoadMoreAnim'

// WPで使用
export default class LoadMore {
  static #instance = null;

  // element
  list = document.querySelector('.js-load-list');
  button = document.querySelector('.js-load-more');


  constructor() {
    if (LoadMore.#instance) {
      return LoadMore.#instance;
    }
    LoadMore.#instance = this;
  }

  static getInstance() {
    if (!LoadMore.#instance) {
      LoadMore.#instance = new LoadMore();
    }
    return LoadMore.#instance;
  }

  getLoadedIds() {
    return Array.from(this.list.querySelectorAll('[data-post-id]'))
      .map((item) => item.dataset.postId)
      .filter(Boolean);
  }

  init(){
    console.log('load more init')
    if (!this.list || !this.button) return;

    this.button.addEventListener('click', async () => {
      const postType = this.list.dataset.postType;
      const currentPage = Number(this.list.dataset.currentPage);
      const nextPage = currentPage + 1;
      const perPage = Number(this.list.dataset.perPage);
      const loadedIds = this.getLoadedIds();

      this.button.disabled = true;

      try {
        const params = new URLSearchParams({
          post_type: postType,
          page: String(nextPage),
          per_page: String(perPage),
          exclude: loadedIds.join(','),
        });

        const response = await fetch(`/wp-json/field-labo/v1/archive?${params.toString()}`);
        const data = await response.json();

        if (data.html) {
          const template = document.createElement('template');
          template.innerHTML = data.html;

          const newItem = Array.from(template.content.querySelectorAll('[data-post-id]'))
          template.content.querySelectorAll('[data-post-id]').forEach((item) => {
            item.classList.add('is-add')
            if (loadedIds.includes(item.dataset.postId)) {
              item.remove();
            }
          });
          this.list.appendChild(template.content);

          const anim = new LoadMoreAnim;
          anim.fadeIn(newItem)
          // anim.fadeIn(document.querySelectorAll('.is-add'))
        }

        this.list.dataset.currentPage = String(data.current_page || nextPage);
        this.list.dataset.maxPage = String(data.max_page || this.list.dataset.maxPage || '');

        if (!data.has_more) {
          this.button.remove();
        } else {
          this.button.disabled = false;
        }
      } catch (error) {
        console.error(error);
        this.button.disabled = false;
      }
    });
  }
}
