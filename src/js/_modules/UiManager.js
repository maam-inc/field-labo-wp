export default class UiManager {

  constructor(){
    this.mm = gsap.matchMedia();
    this.mq_sp = `(max-width: 767px)`;
    this.mq_pc = `(min-width: 768px)`;
    this.cmd = { isPc: this.mq_pc, isSp: this.mq_sp };

    this.modal = document.getElementById('l-modal');
    this.header = document.querySelector('.l-header');
    this.headerH = this.header.offsetHeight;
    // this.modalOpenBg = document.querySelector('.modalOpenBg');
    this.flag = true;
  }

  init(){
    this.pageTop();
    this.headerUi();
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

  headerUi() {
    this.mm.add( this.cmd,
      (context) => {
        const { isPc, isSp } = context.conditions;
        // logoの色を変える
        const logo = '.header__logo svg .cls-1';
        const menuBtn = '.menu .menu__btn-open';
        const playBtn = '.header .header__play-btn .icon-wrapper';
        const trigger = document.querySelector('.main__inner'); 
        gsap.set(logo, { fill: "#fff" });
        gsap.set([menuBtn, playBtn], { border: "none" });
        gsap.to(logo, {
          scrollTrigger: {
            trigger: trigger,
            start: () => `bottom ${this.headerH}px`,
            endTrigger: ".footer",
            end: () => `top ${this.headerH}px`,
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
          fill: "#000",
          duration: 0.01,
          ease: "none"
        });

        if(isPc){
          gsap.to([menuBtn, playBtn], {
            scrollTrigger: {
              trigger: trigger,
              start: () => `bottom ${this.headerH}px`,
              endTrigger: ".footer",
              end: () => `top ${this.headerH}px`,
              toggleActions: "play reverse play reverse",
              invalidateOnRefresh: true,
            },
            border: "#D8D8D8 solid 1px",
            duration: 0.01,
            ease: "none"
          });          
        }

      }
    );
  }
}