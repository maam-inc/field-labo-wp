export default class UiManager {

  constructor(){
    this.mm = gsap.matchMedia();
    this.mq_sp = `(max-width: 767px)`;
    this.mq_pc = `(min-width: 768px)`;
    this.cmd = { isPc: this.mq_pc, isSp: this.mq_sp };


    this.header = document.querySelector('.l-header');
    this.headerH = this.header.offsetHeight;
    this.modalOpenBg = document.querySelector('.modalOpenBg');
    this.flag = true;
  }

  init(){
    this.modalUi();
    this.indexFunc();
    this.pageTop();
    // this.headerUi();
  }

  // TOP / FAQ の共通モーダル（#commonModal）専用
  modalUi(){
    const modal = document.getElementById('commonModal');
    if(!modal) return;

    const modalContent = modal.querySelector('.js-modalContent');

    document.querySelectorAll('.js-modalOpen[data-id="commonModal"]').forEach((item) => {
      item.addEventListener('click', () => {
        const post = item.dataset.post;
        if(post && modalContent){
          const data = document.querySelector(`.data[data-post="${post}"]`);
          if(data) modalContent.innerHTML = data.innerHTML;
        }
        this.openModal();
      });
    });

    document.querySelectorAll('.js-modalClose[data-id="commonModal"]').forEach((item) => {
      item.addEventListener('click', () => {
        this.flag = false;
        this.closeModal();
      });
    });
  }

  freezeScroll() {
    const scrollY = window.scrollY;
    this.savedScrollY = scrollY;
    this.modalOpenBg.style.position = 'fixed';
    this.modalOpenBg.style.top = `-${scrollY}px`;
    this.modalOpenBg.style.left = '0';
    this.modalOpenBg.style.right = '0';
    this.modalOpenBg.style.width = '100%';
  }
  
  openModal(){
    const modal = document.getElementById('commonModal');
    if(!modal) return;

    document.body.style.overflow = 'hidden';
    const modalContainer = modal.querySelector('.c-modal__container');
    const modalBtn = modal.querySelector('.c-modal__btn');

    gsap.set(modal, { display: "block" });
    this.freezeScroll();
    gsap.to(this.modalOpenBg, { opacity: 1, duration: 0.5, ease: "power3.out" });
    gsap.to(modal, { opacity: 1, duration: 0.5, ease: "power3.out" });

    gsap.set(modalContainer, { scale: 1 });
    gsap.set(modalBtn, { scale: 0.5, opacity: 0 });
    gsap.to(modalBtn, { opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.3 });
    gsap.to(modalBtn, { scale: 1, duration: 0.5, ease: "back.out(2)", delay: 0.3 });

    gsap.set(modalContainer, { scrollTo: 70 });
    gsap.to(modalContainer, { duration: 0.85, ease: "power4.out", scrollTo: 0 });
  }

  closeModal(){
    const modal = document.getElementById('commonModal');
    if(!modal) return;

    document.body.style.overflow = 'auto';
    const modalContainer = modal.querySelector('.c-modal__container');
    const modalBtn = modal.querySelector('.c-modal__btn');

    this.modalOpenBg.style.position = '';
    this.modalOpenBg.style.top = '';
    this.modalOpenBg.style.left = '';
    this.modalOpenBg.style.right = '';
    this.modalOpenBg.style.width = '';
    this.modalOpenBg.style.opacity = '1';
    window.scrollTo(0, this.savedScrollY);

    gsap.to(this.modalOpenBg, { opacity: 1, duration: 0.5, ease: "power3.out" });
    gsap.to(modal, {
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => { gsap.set(modal, { display: "none" }); }
    });
    gsap.to(modalContainer, { scale: 0.95, duration: 0.7, ease: "power3.out" });
    gsap.to(modalBtn, { scale: 0.8, duration: 0.7, ease: "power3.out" });
  }

  indexFunc(){
    const targets = document.querySelectorAll('.js-toCont');
    targets.forEach(e => {
      e.addEventListener("click", () => {
        const id = e.getAttribute('data-id');
        this.scrollToFunc(id)
      })
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
    const target = document.querySelectorAll('.js-pageTop');
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