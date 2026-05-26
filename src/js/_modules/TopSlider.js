import Swiper from 'swiper';
import { gsap } from 'gsap';

export default class TopSlider {
  constructor() {
    this.mq = window.matchMedia('(min-width: 768px)');

  }

  init() {
    this.sliderAnim();
  }

  sliderAnim(){
    const swiper = new Swiper('.topMain__mv', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 800,
    effect: 'slide',
    // Navigation arrows
    navigation: {
      nextEl: '.topMain__mv--next',
      prevEl: '.topMain__mv--prev',
    },
  });
  }
}
