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
        this.openModal(this.modal);
      });
    });

    document.querySelectorAll('.btn-close').forEach((item) => {
      item.addEventListener('click', () => {
        this.closeModal(this.modal);
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
  
  openModal(modal){
    modal.classList.toggle('is-open')
    if(!modal) return;

    const modalContainer = modal.querySelector('.l-modal__container');
    const modalBtn = modal.querySelector('.l-modal__btn');

    gsap.set(modal, { display: "block" });
    gsap.to(modal, { opacity: 1, duration: 0.5, ease: "power3.out" });
  }

  closeModal(modal){
    modal.classList.toggle('is-open')
    if(!modal) return;

    console.log('common modal close')

    // document.body.style.overflow = 'auto';
    const modalContainer = modal.querySelector('.l-modal__container');
    const modalBtn = modal.querySelector('.l-modal__btn');

    gsap.to(modal, { opacity: 1, duration: 0.5, ease: "power3.out" });
    gsap.to(modal, {
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => { gsap.set(modal, { display: "none" }); }
    });
  }
}