import { gsap } from 'gsap';

export default class LoadMore {

  constructor(){
    this.mm = gsap.matchMedia();
    this.mq_sp = `(max-width: 767px)`;
    this.mq_pc = `(min-width: 768px)`;
    this.cmd = { isPc: this.mq_pc, isSp: this.mq_sp };

    this.showDuration = 1;   // sec
    this.stagger = 0.08;     // sec
  }

  init(){
    this.observeNewItems();
  }

  observeNewItems(){
    const container = document.querySelector('.topContents__gallery-wrapper');
    if (!container) return;

    const observer = new MutationObserver((mutations) => {
      // 1コールバック内で追加された item をまとめて取得
      const newItems = [];
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (!node.classList.contains('topContents__item')) return;
          newItems.push(node);
        });
      });
      if (newItems.length) this.fadeInStagger(newItems);
    });
    observer.observe(container, { childList: true });
  }

  fadeInStagger(items){
    gsap.set(items, { opacity: 0 });
    gsap.to(items, {
      opacity: 1,
      duration: this.showDuration,
      ease: 'power1.out',
      stagger: this.stagger,
    });
  }
}
