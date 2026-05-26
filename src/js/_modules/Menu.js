export default class Menu {
  constructor() {
    this.mq = window.matchMedia('(min-width: 768px)');
    this.modal = document.querySelector('.l-header__modal');

  }

  init() {
    const target = document.querySelector('.l-headerFixed__menu');
    // if (!this.modal) return;

    target.addEventListener('click', () => {
      this.open();
    });

    // クローズ
    this.modal.addEventListener('click', (e) => {
      if (e.target.closest('.l-header__modal-close')) {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.add('is-open');
  }

  close() {
    this.modal.classList.remove('is-open');
  }
}
