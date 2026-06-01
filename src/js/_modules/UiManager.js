export default class UiManager {

  constructor(){
    this.mq = window.matchMedia('(min-width: 768px)');
    this.mqSp = window.matchMedia('(max-width: 767px)');
    this.header = document.querySelector('.l-header');
    this.headerFixed = document.querySelector('.l-headerFixed');
    this.headerH = this.header.offsetHeight;
    this.headerFixedH = this.headerFixed.offsetHeight;
    this.trigger = document.querySelector('.l-content');
  }

  init(){
    this.pageTopUi();
    this.headerUi();
    this.ctrlUi()
  }

  headerUi() {
    if (!this.headerFixed) return;
    ScrollTrigger.create({
      trigger: this.trigger,
      start: "top top",
      onEnter: () => this.headerFixed.classList.add('is-show'),
      onLeaveBack: () => this.headerFixed.classList.remove('is-show'),
    })
  }

  pageTopUi(){
    const toTOP = document.querySelectorAll('.c-toTop');
    if(!toTOP) return;
    toTOP.forEach(e => {
      e.addEventListener("click", () => {
        gsap.set( window, { scrollTo: { y: 100 }});
        gsap.to( window, { duration: .7, ease: 'power3.out',scrollTo: { y: 0 }});
      });
    })

    const fixedToTop = document.querySelector('.c-toTop--fixed');
    if(!fixedToTop) return;
    ScrollTrigger.create({
      trigger: this.trigger,
      endTrigger: '.l-footer',
      start: "top top",
      end: "top bottom",
      onEnter: () => fixedToTop.classList.add('is-show'),
      onEnterBack: () => fixedToTop.classList.add('is-show'),
      onLeaveBack: () => fixedToTop.classList.remove('is-show'),
      onLeave: () => fixedToTop.classList.remove('is-show'),
    })
  }

  ctrlUi(){
    const fixedCtrl = document.querySelector('.topContents__ctrl--fixed');
    if(!fixedCtrl) return;
    if(this.mq.matches){
      ScrollTrigger.create({
        trigger: '.topContents',
        start: `top top+=${this.headerFixedH}px`,
        onEnter: () => fixedCtrl.classList.add('is-show'),
        onEnterBack: () => fixedCtrl.classList.add('is-show'),
        onLeaveBack: () => fixedCtrl.classList.remove('is-show'),
        onLeave: () => fixedCtrl.classList.remove('is-show'),
      })
    } else {
      ScrollTrigger.create({
        trigger: '.topContents__ctrl',
        endTrigger: '.l-footer',
        start:`top top+=${this.headerFixedH}px`,
        end: "top bottom",
        onEnter: () => fixedCtrl.classList.add('is-show'),
        onEnterBack: () => fixedCtrl.classList.add('is-show'),
        onLeaveBack: () => fixedCtrl.classList.remove('is-show'),
        onLeave: () => fixedCtrl.classList.remove('is-show'),
      })      
    }
  }
}