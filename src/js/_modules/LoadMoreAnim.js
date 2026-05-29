import { gsap } from 'gsap';

export default class LoadMoreAnim {
  // .is-addクラスを持つ要素を対象にアニメーションする
  fadeIn(items) {
    if (!items || !items.length) return;

    gsap.set(items, { opacity: 0, y: 5 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power1.out',
      stagger: 0.04,
    });
  }
}
