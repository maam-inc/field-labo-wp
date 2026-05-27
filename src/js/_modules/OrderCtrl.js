import { gsap } from 'gsap';

export default class OrderCtrl {
  constructor() {
    this.hideDuration = 0.4; // sec
    this.showDuration = 1; // sec
    this.stagger = 0.08;     // sec
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

    // 既に走ってるアニメは止める（連打対策）
    if (this._hideTween) this._hideTween.kill();
    if (this._showTween) this._showTween.kill();

    // 1. ギャラリー全体をフェードアウト
    this._hideTween = gsap.to(this.gallery, {
      opacity: 0,
      duration: this.hideDuration,
      ease: 'power1.out',
      onComplete: () => {
        // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 入れ替えの処理 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 入れ替えの処理 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑

        // 入れ替え後の item を再取得
        const items = this.gallery.querySelectorAll('.topContents__item');

        // gallery は即時表示、items は隠した状態にしておく
        gsap.set(this.gallery, { opacity: 1 });
        gsap.set(items, { opacity: 0 });

        // 2. 上から順番に stagger でフェードイン
        this._showTween = gsap.to(items, {
          opacity: 1,
          duration: this.showDuration,
          ease: 'power1.out',
          stagger: this.stagger,
        });
      },
    });
  }
}
