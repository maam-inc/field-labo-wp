export default class CommonModalAnim {
  openModal(modal){
    if(!modal) return;  
    modal.classList.add('is-open') // bgが表示トリガークラス
    modal.classList.add('is-loading') // loadingアニメーショントリガークラス
    const c = modal.querySelector('.l-modal__wrapper')

    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
    if(c) c.scrollTop = 0;
    setTimeout(()=>{
      modal.classList.add('is-loaded')// モーダル中身の表示トリガークラス
      modal.scrollTop = 0;
      if(c) c.scrollTop = 0;
      setTimeout(()=> {
        modal.classList.remove('is-loading')// 中身が表示された後にローディングアニメーションを消す
      }, 300)
    }, 1000)
  }

  closeModal(modal){
    if(!modal) return;
    modal.classList.remove('is-loaded')
    modal.classList.remove('is-open');
    document.body.style.overflow = 'auto';
  }
}