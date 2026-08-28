import Swiper from 'swiper/bundle';

export default class ThumbSlider {

  constructor(){
    this.mq = window.matchMedia('(min-width: 768px)');
    this.mqSp = window.matchMedia('(max-width: 767px)');
  }

  init() {
    this.sliderAnim();
  }

  sliderAnim() {
    const elms = document.querySelectorAll('#project .projects__gallery-swiper')
    elms.forEach((elm, i)=>{
      elm.classList.add(`projects__gallery-swiper--${i+1}`)
      const swiperElm = document.querySelectorAll(`.projects__gallery-swiper--${i+1}`)
      const swiper = new Swiper(`.projects__gallery-swiper--${i+1}`, {
        loop: true,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        speed: 600,
        effect: 'slide',
        slidesPerView: 1,
        allowTouchMove: false,
        navigation: {
          nextEl: `.projects__gallery-swiper--${i+1} .projects__gallery--next`,
          prevEl: `.projects__gallery-swiper--${i+1} .projects__gallery--prev`,
        }
      });      
    })
  }
}