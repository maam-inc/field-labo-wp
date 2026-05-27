export default class CommonModal {

  constructor(){
    this.mm = gsap.matchMedia();
    this.mq_sp = `(max-width: 767px)`;
    this.mq_pc = `(min-width: 768px)`;
    this.cmd = { isPc: this.mq_pc, isSp: this.mq_sp };

    this.header = document.querySelector('.l-header');
    this.headerH = this.header.offsetHeight;
  }

  init(){
    this.modalUi();
  }

  // TOP / FAQ の共通モーダル専用
  modalUi(){
    const elm = document.querySelector(`.l-modal`);
    if(!elm) return;
    document.querySelectorAll('.btn-open').forEach((item) => {
      item.addEventListener('click', () => {
        this.openModal(elm);
      });
    });

    document.querySelectorAll('.btn-close').forEach((item) => {
      item.addEventListener('click', () => {
        this.closeModal(elm);
      });
    });
  }
  
  openModal(modal){
    console.log('common modal target : ',modal)
    modal.classList.add('is-open')
    if(!modal) return;

    document.body.style.overflow = 'hidden';
    const c = modal.querySelector('.l-modal__wrapper') 
    const bg = modal.querySelector('.l-modal__bg') 
    const btn = modal.querySelector('.l-modal__btn') 
    gsap.set(c, {opacity:0, y: 30})
    gsap.set([bg, btn], {opacity:0,})
    gsap.to(c, {opacity:1, y: 0, duration: 0.2, ease: "linear", })    
    gsap.to([bg, btn], {opacity:1, duration: 0.2, ease: "linear", })    
  }

  closeModal(modal){
    if(!modal) return;
    const c = modal.querySelector('.l-modal__wrapper');
    const bg = modal.querySelector('.l-modal__bg');
    const btn = modal.querySelector('.l-modal__btn') 

    gsap.to(c,  { opacity: 0, y: 30, duration: 0.2, ease: "linear" });
    gsap.to([bg, btn], { opacity: 0, duration: 0.2, ease: "linear",
      onComplete: () => {
        modal.classList.remove('is-open');
        document.body.style.overflow = 'auto';
      }
    });
  }
}
