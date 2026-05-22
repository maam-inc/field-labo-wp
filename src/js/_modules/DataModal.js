export default class DataModal {
  constructor() {
    this.mq = window.matchMedia('(min-width: 768px)');
    this.modal = null;
    this.modalImg = null;
    this.targets = [];
  }

  init() {
    this.modal = document.getElementById('dataModal');
    if (!this.modal) return;

    this.targets = document.querySelectorAll('.contents__data-img');
    if (this.targets.length === 0) return;

    this.modalImg = this.modal.querySelector('.dataModal__img img');
    if (!this.modalImg) return;

    // クリックでモーダルを開く（PCのみ）
    this.targets.forEach((target) => {
      target.addEventListener('click', () => {
        if (!this.mq.matches) return;

        const img = target.querySelector('img');
        // if (!img) return;
        this.open(img.getAttribute('src'));
      });
    });

    // クローズ
    this.modal.addEventListener('click', (e) => {
      if (e.target.closest('.dataModal__close')) {
        this.close();
      }
    });
  }

  open(src) {
    this.modalImg.setAttribute('src', src);
    this.modal.classList.add('is-open');
  }

  close() {
    this.modal.classList.remove('is-open');
    this.modalImg.setAttribute('src', '');
  }
}
