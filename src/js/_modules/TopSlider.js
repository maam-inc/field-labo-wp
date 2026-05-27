import Swiper from 'swiper/bundle';
import { gsap } from 'gsap';

export default class TopSlider {
  constructor() {
    this.mq = window.matchMedia('(min-width: 768px)');
  }

  init() {
    this.sliderAnim();
  }

  splitChars(el) {
    if (el.dataset.split === 'true') return;
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((c) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = c === ' ' ? ' ' : c;
      el.appendChild(span);
    });
    el.dataset.split = 'true';
  }

  resetSlide(slide) {
    const title = slide.querySelector('.title');
    const summary = slide.querySelector('.main_summary');
    [title, summary].forEach((el) => {
      if (!el) return;
      gsap.set(el, { backgroundSize: '0% 100%' });
      gsap.set(el.querySelectorAll('.char'), { opacity: 0 });
    });
  }

  playSlide(slide) {
    const title = slide.querySelector('.title');
    const summary = slide.querySelector('.main_summary');
    const tl = gsap.timeline({delay: 0.5});

    [title, summary].forEach((el, i) => {
      if (!el) return;
      const chars = el.querySelectorAll('.char');
      const startAt = i * 0.25;
      tl.to( el, { backgroundSize: '100% 100%', duration: 1, ease: 'power2.out' }, startAt);
      tl.to( chars, { opacity: 1, duration: 0.01, stagger: 0.04, ease: 'none' }, startAt + 0.35);
    });
  }

  sliderAnim() {
    document
      .querySelectorAll('.topMain__mv .title, .topMain__mv .main_summary')
      .forEach((el) => this.splitChars(el));

    const swiper = new Swiper('.topMain__mv', {
      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      speed: 800,
      effect: 'slide',
      slidesPerView: 1,
      navigation: {
        nextEl: '.topMain__mv--next',
        prevEl: '.topMain__mv--prev',
      },
      on: {
        init: (sw) => {
          setTimeout(()=>{
            sw.slides.forEach((s) => this.resetSlide(s));
            this.playSlide(sw.slides[sw.activeIndex]);            
          }, 200)

        },
        slideChangeTransitionStart: (sw) => {
          const active = sw.slides[sw.activeIndex];
          this.resetSlide(active);
          this.playSlide(active);
        },
      },
    });
  }
}
