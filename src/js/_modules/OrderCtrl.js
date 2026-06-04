import { gsap } from 'gsap';

export default class OrderCtrl {
  constructor() {
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
      duration: 0.2,
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
        this._showTween = gsap.fromTo(items, 
        {
          opacity: 0,
          y: 5,
        },       
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power1.out',
          stagger: 0.07,
        });
      },
    });
  }


  hideGalleryAnim(gallery) {
    console.log('hideGalleryAnim')
    gsap.to(gallery, {
      opacity: 0,
      duration: 0.2,
      ease: 'power1.out',
    })
  }

  cardAppearAnim(cards) {
    console.log('cardAppearAnim')
    if(!cards || !cards.length) return

    gsap.fromTo(cards, {
      opacity: 0,
      y: 5,
    },{
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power1.out',
      stagger: 0.07,
      onComplete: () => {
        ScrollTrigger.refresh()
      }
    });
  }
}
