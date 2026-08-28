export default class PostModal {
  constructor() {
    this.mq = window.matchMedia('(min-width: 768px)');
    this.gallery = this.pickModal('galleryModal');
    this.data = this.pickModal('dataModal');
    this.activeGallery = null;
    this.sources = [];
    this.index = 0;
  }

  pickModal(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    const img = el.querySelector('img');
    if (!img) return null;
    const source = this.ensureWebpSource(img);
    return { el, img, source };
  }

  ensureWebpSource(img) {
    const picture = img.closest('picture');
    if (picture) {
      let source = picture.querySelector('source[type="image/webp"]');
      if (!source) {
        source = document.createElement('source');
        source.setAttribute('type', 'image/webp');
        picture.insertBefore(source, img);
      }
      return source;
    }

    const source = document.createElement('source');
    source.setAttribute('type', 'image/webp');
    const newPicture = document.createElement('picture');
    img.parentNode.insertBefore(newPicture, img);
    newPicture.appendChild(source);
    newPicture.appendChild(img);
    return source;
  }

  getWebpSrc(src) {
    return src ? `${src}.webp` : '';
  }

  init() {
    if (this.gallery) this.initGallery();
    if (this.data) this.initData();
  }

  initGallery() {
    document.querySelectorAll('.contents__gallery').forEach((gallery) => {
      gallery.addEventListener('click', (e) => {
        const item = e.target.closest('.contents__gallery-img');
        if (!item || !gallery.contains(item)) return;
        this.activeGallery = gallery;
        const items = Array.from(gallery.querySelectorAll('.contents__gallery-img'));
        this.sources = items.map((el) => el.querySelector('img')?.getAttribute('src'));
        this.index = Math.max(items.indexOf(item), 0);
        this.open(this.gallery, this.sources[this.index]);
      });
    });

    this.gallery.el.addEventListener('click', (e) => {
      if (e.target.closest('.galleryModal__close')) return this.close(this.gallery);
      if (e.target.closest('.galleryModal__nav--prev')) return this.show(this.index - 1);
      if (e.target.closest('.galleryModal__nav--next')) return this.show(this.index + 1);
    });
  }

  initData() {
    document.querySelectorAll('.contents__img--zoom').forEach((target) => {
      target.addEventListener('click', () => {
        if (!this.mq.matches) return;
        const src = target.querySelector('img')?.getAttribute('src');
        if (src) this.open(this.data, src);
      });
    });

    this.data.el.addEventListener('click', (e) => {
      if (e.target.closest('.dataModal__close')) this.close(this.data);
    });
  }

  show(i) {
    const len = this.sources.length;
    if (!len) return;
    this.index = (i + len) % len;
    this.setImage(this.gallery, this.sources[this.index]);
    this.replay();
  }

  replay() {
    const c = this.gallery.el.querySelector('.galleryModal__img');
    if (!c) return;
    gsap.set(c, {opacity:0, y: 20})
    gsap.to(c, {opacity:1, y: 0, duration: 0.3, ease: "sine.out", })
  }

  open({ el, img }, src) {
    document.body.style.overflow = 'hidden';
    this.setImage({ img, source: this.ensureWebpSource(img) }, src);
    el.classList.add('is-open');
    const c = el.querySelector('.postModal__img');
    const bg = el.querySelector('.postModal__bg');
    const btn = el.querySelector('.c-modalCloseIcon__btn');
    gsap.set(c, {opacity:0, y: 30})
    gsap.set([bg, btn], {opacity:0})

    gsap.to(c, {opacity:1, y: 0, duration: 0.3, ease: "sine.out", })
    gsap.to(bg, {opacity: 0.8, duration: 0.3, ease: "sine.out", })
    gsap.to(btn, {opacity: 1, duration: 0.3, ease: "sine.out", })
  }

  close({ el, img }) {
    document.body.style.overflow = 'auto';
    const c = el.querySelector('.postModal__img');
    const bg = el.querySelector('.postModal__bg');
    const btn = el.querySelector('.c-modalCloseIcon__btn');

    gsap.to(c, {opacity:0, y: 30, duration: 0.3, ease: "sine.out", })
    gsap.to(bg, {opacity: 0, duration: 0.3, ease: "sine.out", })
    gsap.to(btn, {opacity: 0, duration: 0.3, ease: "sine.out", })

    el.classList.remove('is-open');
    this.setImage({ img, source: this.ensureWebpSource(img) }, '');
  }

  setImage({ img, source }, src) {
    if (source) source.setAttribute('srcset', this.getWebpSrc(src));
    img.setAttribute('src', src);
  }
}