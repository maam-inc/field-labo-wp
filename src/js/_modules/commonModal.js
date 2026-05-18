export default class CommonModal {

  constructor(){
    this.mm = gsap.matchMedia();
    this.mq_sp = `(max-width: 767px)`;
    this.mq_pc = `(min-width: 768px)`;
    this.cmd = { isPc: this.mq_pc, isSp: this.mq_sp };

    this.modal = document.getElementById('l-modal');
    this.header = document.querySelector('.l-header');
    this.headerH = this.header.offsetHeight;
  }

  init(){
    this.modalUi();
  }

  // TOP / FAQ の共通モーダル専用
  modalUi(){
    if(!this.modal) return;

    document.querySelectorAll('.btn-open').forEach((item) => {
      item.addEventListener('click', () => {
        this.openModal();
      });
    });

    document.querySelectorAll('.btn-close').forEach((item) => {
      item.addEventListener('click', () => {
        this.closeModal();
      });
    });
  }

  // freezeScroll() {
  //   const scrollY = window.scrollY;
  //   // this.savedScrollY = scrollY;
  //   this.modal.style.position = 'fixed';
  //   // this.modal.style.top = `-${scrollY}px`;
  //   this.modal.style.top = `0`;
  //   this.modal.style.left = '0';
  //   this.modal.style.right = '0';
  //   this.modal.style.width = '100%';
  // }
  
  openModal(){
    this.modal.classList.toggle('is-open')
    if(!this.modal) return;

    // document.body.style.overflow = 'hidden';
    const modalContainer = this.modal.querySelector('.l-modal__container');
    const modalBtn = this.modal.querySelector('.l-modal__btn');

    gsap.set(this.modal, { display: "block" });
    // this.freezeScroll();
    gsap.to(this.modal, { opacity: 1, duration: 0.5, ease: "power3.out" });

    // gsap.set(modalContainer, { scale: 1 });
    // gsap.set(modalBtn, { scale: 0.5, opacity: 0 });
    // gsap.to(modalBtn, { opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.3 });
    // gsap.to(modalBtn, { scale: 1, duration: 0.5, ease: "back.out(2)", delay: 0.3 });

    // gsap.set(modalContainer, { scrollTo: 70 });
    // gsap.to(modalContainer, { duration: 0.85, ease: "power4.out", scrollTo: 0 });
  }

  closeModal(){
    this.modal.classList.toggle('is-open')
    if(!this.modal) return;

    // document.body.style.overflow = 'auto';
    const modalContainer = this.modal.querySelector('.l-modal__container');
    const modalBtn = this.modal.querySelector('.l-modal__btn');

    gsap.to(this.modal, { opacity: 1, duration: 0.5, ease: "power3.out" });
    gsap.to(this.modal, {
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => { gsap.set(this.modal, { display: "none" }); }
    });
  }
}