import { gsap } from 'gsap';

export default class OrderCtrlAnim {
  constructor() {
    this._hideTween = null;
    this._showTween = null;
  }

  // アニメートしたいタイミングでそれぞれ「this.orderAnim.hide();」
  // または「this.orderAnim.show();」を記述すればOK

  // 対象を隠す（フェードアウト）
  hide() {

    // 連打対策：走っているアニメは止める
    if (this._hideTween) this._hideTween.kill();
    if (this._showTween) this._showTween.kill();

    this._hideTween = gsap.to('.topContents__gallery', {
      opacity: 0,
      duration: 0,
      ease: 'power1.out',
    });
  }

  // 対象を再表示（アイテムを上から stagger でフェードイン）
  show() {
    const target = document.querySelector('.topContents__gallery')
    const items = target.querySelectorAll('.topContents__item');
    gsap.set(target, { opacity: 1 });

    this._showTween = gsap.fromTo(items,
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power1.out', stagger: 0.04 }
    );
  }
}
