export default class CommonModalAnim {
  openModal(modal){
    modal.classList.add('is-open')
    if(!modal) return;

    document.body.style.overflow = 'hidden';
    const c = modal.querySelector('.l-modal__wrapper')
    const bg = modal.querySelector('.l-modal__bg')
    const btn = modal.querySelector('.l-modal__btn')
    modal.scrollTop = 0;
    if(c) c.scrollTop = 0;
    gsap.set(c, {opacity:0, y: 30})
    gsap.set([bg, btn], {opacity:0,})
    gsap.to(c, {opacity:1, y: 0, duration: 0.3, ease: "sine.out", })    
    gsap.to([bg, btn], {opacity:1, duration: 0.3, ease: "sine.out", })    
  }

  closeModal(modal){
    if(!modal) return;
    const c = modal.querySelector('.l-modal__wrapper');
    const bg = modal.querySelector('.l-modal__bg');
    const btn = modal.querySelector('.l-modal__btn') 

    gsap.to(c,  { opacity: 0, y: 30, duration: 0.3, ease: "sine.out" });
    gsap.to([bg, btn], { opacity: 0, duration: 0.3, ease: "sine.out",
      onComplete: () => {
        modal.classList.remove('is-open');
        document.body.style.overflow = 'auto';
      }
    });
  }
}