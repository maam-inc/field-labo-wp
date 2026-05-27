export default class LoadMore {

  constructor(){
    this.mm = gsap.matchMedia();
    this.mq_sp = `(max-width: 767px)`;
    this.mq_pc = `(min-width: 768px)`;
    this.cmd = { isPc: this.mq_pc, isSp: this.mq_sp };
  }

  init(){
    this.observeNewItems();
  }

  observeNewItems(){
    const container = document.querySelector('.topContents__gallery-wrapper');
    if (!container) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (!node.classList.contains('topContents__item')) return;
          this.fadeIn(node);
        });
      });
    });
    observer.observe(container, { childList: true });
  }

  fadeIn(el){
    el.style.opacity = '0';
    el.style.transition = 'opacity .6s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
      });
    });
  }
}