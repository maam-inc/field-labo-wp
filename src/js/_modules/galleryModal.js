export default class GalleryModal {
  constructor() {
    this.modal = null;
    this.modalImg = null;
    this.galleries = [];
    this.activeGallery = null;
    this.sources = [];
    this.index = 0;
  }

  init() {
    this.modal = document.getElementById('galleryModal');
    if (!this.modal) return;

    this.galleries = document.querySelectorAll('.contents__gallery');
    if (this.galleries.length === 0) return;

    this.modalImg = this.modal.querySelector('.galleryModal__img img');
    if (!this.modalImg) return;

    // サムネイルクリックでモーダルを開く（イベント委譲。WPで画像が動的に変わっても拾える）
    this.galleries.forEach((gallery) => {
      gallery.addEventListener('click', (e) => {
        const item = e.target.closest('.contents__gallery-img');
        if (!item || !gallery.contains(item)) return;
        this.activeGallery = gallery;
        this.collectSources();
        const items = Array.from(gallery.querySelectorAll('.contents__gallery-img'));
        const i = items.indexOf(item);
        this.index = i < 0 ? 0 : i;
        this.open();
      });
    });

    // モーダル内の操作
    this.modal.addEventListener('click', (e) => {
      if (e.target.closest('.galleryModal__close')) {
        this.close();
        return;
      }
      if (e.target.closest('.galleryModal__nav--prev')) {
        this.show(this.index - 1);
        return;
      }
      if (e.target.closest('.galleryModal__nav--next')) {
        this.show(this.index + 1);
        return;
      }
    });
  }

  collectSources() {
    if (!this.activeGallery) return;
    const imgs = this.activeGallery.querySelectorAll('.contents__gallery-img img');
    this.sources = Array.from(imgs).map((img) => img.getAttribute('src'));
  }

  show(i) {
    const len = this.sources.length;
    if (len === 0) return;
    this.index = (i + len) % len;
    this.modalImg.setAttribute('src', this.sources[this.index]);
  }

  open() {
    if (this.sources.length === 0) return;
    this.modalImg.setAttribute('src', this.sources[this.index]);
    this.modal.classList.add('is-open');
  }

  close() {
    this.modal.classList.remove('is-open');
    this.modalImg.setAttribute('src', '');
  }
}
