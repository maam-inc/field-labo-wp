import Swiper from 'swiper/bundle';
// import 'swiper/css';
export default class MainSwiper {

  constructor(){
    this.mm = gsap.matchMedia();
    this.mq_sp = `(max-width: 767px)`;
    this.mq_pc = `(min-width: 768px)`;
    this.cmd = { isPc: this.mq_pc, isSp: this.mq_sp };
  }

  init(){
    this.MainSwiper();
  }

  MainSwiper(){
    const mainSwiper = new Swiper('.js-mainSwiper', {

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      loop: true,
      allowTouchMove: false,
      autoplay: {
        delay: 3000,
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      speed: 1000,
    });

    mainSwiper.autoplay.start();
  }
}