export default class OrderCtrl {
  constructor() {
    this.hideDuration = 400;
  }

  init() {
    this.gallery = document.querySelector('.topContents__gallery');

    const ctrls = document.querySelectorAll('.order__ctrl');
    ctrls.forEach((ctrl) => {
      const buttons = ctrl.querySelectorAll('.order__ctrl-name');
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => this.onClick(btn, ctrls));
      });
    });

    const sorts = document.querySelectorAll('.sort__lists');
    sorts.forEach((sel) => {
      sel.addEventListener('change', () => this.onSortChange(sel, sorts));
    });
  }

  onSortChange(changed, sorts) {
    sorts.forEach((sel) => {
      if (sel !== changed) sel.value = changed.value;
    });
    this.playGalleryAnim();
  }

  onClick(clicked, ctrls) {
    const isRandom = clicked.classList.contains('order__ctrl-random');
    const targetClass = isRandom ? 'order__ctrl-random' : 'order__ctrl-latest';

    if (clicked.classList.contains('is-active')) return;

    ctrls.forEach((ctrl) => {
      ctrl.querySelectorAll('.order__ctrl-name').forEach((btn) => {
        btn.classList.toggle('is-active', btn.classList.contains(targetClass));
      });
    });

    this.playGalleryAnim();
  }

  playGalleryAnim() {
    if (!this.gallery) return;

    this.gallery.classList.add('is-hidden');
    window.clearTimeout(this._timer);
    this._timer = window.setTimeout(() => {
      // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓ここに入れ替えの記述入れる↓↓↓↓↓↓↓↓↓↓↓↓↓↓
      // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑ここに入れ替えの記述入れる↑↑↑↑↑↑↑↑↑↑↑↑↑↑
      this.gallery.classList.remove('is-hidden');
    }, this.hideDuration);
  }
}
