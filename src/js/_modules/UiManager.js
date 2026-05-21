export default class UiManager {

  constructor(){
    this.mq = window.matchMedia('(min-width: 768px)');
    this.header = document.querySelector('.l-header');
    this.headerFixed = document.querySelector('.l-headerFixed');
    this.headerH = this.header.offsetHeight;
    this.flag = true;
  }

  init(){
    this.pageTop();
    this.headerUi();
  }

  headerUi() {
    if (!this.headerFixed) return;
    ScrollTrigger.create({
      trigger: '.topContents',
      start: "top top",
      onEnter: () => this.headerFixed.classList.add('is-show'),
      onLeaveBack: () => this.headerFixed.classList.remove('is-show'),
    })
  }

  scrollToFunc(id){
    const target = document.getElementById(id);
    const targetTop = Math.trunc(target.getBoundingClientRect().top + window.pageYOffset);
    const modal = document.getElementById('menuModal')
    const modalContainer = modal.querySelector('.modal__container');


    if( window.pageYOffset < targetTop - 100 ){
      gsap.set( window, { scrollTo: { y: targetTop - 100 }});
    }
    else if( window.pageYOffset > targetTop + 100 ){
      gsap.set( window, { scrollTo: { y: targetTop + 100 }});
    }
    if(modal.style.display === 'block') {
      document.body.style.overflow = 'auto';
      gsap.to( window, { duration: .7, ease: 'power3.out', scrollTo: { y: targetTop - this.headerH}});
      gsap.to(this.modalOpenBg, {opacity: 1, duration: 0.5, ease: "power3.out"})
      gsap.to(modal, {opacity:0, duration: 0.5, ease: "power3.out", delay: 0.1, onComplete: () => { gsap.to(modal, {display: "none"})}});
      gsap.to(modalContainer, { scale: 0.95, duration: 0.7, ease: "power3.out", delay: 0.1 });
    } else {
      gsap.to( window, { duration: .7, ease: 'power3.out', scrollTo: { y: targetTop - this.headerH}});
    }
  }
  
  pageTop(){
    const target = document.querySelectorAll('.c-toTop');
    target.forEach(e => {
      e.addEventListener("click", () => {
        gsap.set( window, { scrollTo: { y: 100 }});
        gsap.to( window, { duration: .7, ease: 'power3.out',scrollTo: { y: 0 }});
      });
    })
  }
}