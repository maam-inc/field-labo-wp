/* eslint-disable */
/*!
 * mSlider v1.0
 * Copyright 2021 maam.inc
 * Contributing Author: maam.inc
 * 多少いじっています。
 */

class mSlider {
  constructor(optional_params) {
    this.setParams(optional_params);

    this.setRequestAFrame();

    if (!this.checkSlider()) return;

    this.setAutoplayDelay();

    this.setSlideLength();

    this.setNow();

    if (this.len <= 1) return;

    this.initialize();
    this.eventHandler();

    if (this.params.autoplay) this.autoPlay();
  }

  setParams(optional_params) {
    // パラメータのデフォルト値
    let default_params = {
      // 要素系
      slider: 'mSlider',

      // アニメーション系
      type: 'slide',
      duration: 640,
      ease: 'Power0.easeNone',

      // 操作系
      swipe: true,
      click_next: true,
      direct: false,
      controller: false,
      controllerCreateElement: false,
      addClassClick: false,

      // 表示系
      init: 0,
      init_hide: false,
      visible_len: 1,
      custom_dist: false,

      // 自動再生系
      autoplay: true,
      autoplay_delay: false,
      autoplay_interval: 5200,
      infinite: true,

      // コールバック
      before_change: () => { },
      after_change: () => { },
      custom_change: () => { },
      initialize_after: () => { },
    };

    this.params = Object.assign({}, default_params, optional_params);
  }

  setRequestAFrame() {
    // requestAFrame
    if (!window.requestAFrame || window.cancelAFrame) {
      window.requestAFrame = (() => {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          function (callback) {
            return window.setTimeout(callback, 1000 / 60);
          }
        );
      })();

      window.cancelAFrame = (() => {
        return (
          window.cancelAnimationFrame ||
          window.webkitCancelAnimationFrame ||
          window.mozCancelAnimationFrame ||
          window.oCancelAnimationFrame ||
          function (id) {
            window.clearTimeout(id);
          }
        );
      })();
    }
  }

  addStyle(elem, styles) {
    Object.keys(styles).forEach((key) => {
      let styleName = key.replace(/\-[a-zA-Z]/g, (str) => {
        // プロパティ名をハイフン区切りからcamelCaseに変換
        return str.replace('-', '').toUpperCase();
      });
      elem.style[styleName] = styles[key]; // 要素にスタイル適用
    });
  }

  checkSlider() {
    if (!this.params.slider) {
      console.error('slider element is not exist.');
      return false;
    }

    this.slider = this.params.slider;
    this.box = this.slider.firstElementChild;
    if (!this.box) {
      console.error('.slider_box_co element is not exist in slider.');
      return false;
    }

    this.slides = this.box.firstElementChild;
    if (!this.slides) {
      console.error('.slider_slides_co element is not exist in slider.');
      return false;
    }

    this.slide = Array.from(this.slides.children);
    if (!this.slide) {
      console.error('.slider_slide_co element is not exist in slider.');
      return false;
    }

    // // this.slideCont = $('.Slider__slide__cont', this.params.slider);
    // if(this.params.type === 'crop' && !this.slideCont) {
    // 	console.error('.Slider__slide__cont element is not exist in slider.');
    // 	return false;
    // }

    return true;
  }

  setAutoplayDelay(delay_time) {
    if (delay_time) this.params.autoplay_delay = delay_time;
    else if (this.params.autoplay_delay === false)
      this.params.autoplay_delay = this.params.autoplay_interval;
  }

  setSlideLength() {
    if (this.params.custom_dist) this.len = this.params.custom_len;
    else this.len = this.slide.length;
  }

  setNow() {
    let now = this.slides.querySelector('.Slider__slide--now');
    this.slide.forEach((el, i) => {
      let index = [].slice.call(el).indexOf(now);
      this.now = index;
    });

    if (!(this.now >= 0)) {
      // nowの値がHTML要素で指定されていない場合
      if (this.params.init === 'random') {
        // initがrandomに指定されていた場合、nowにランダム値を割り当て
        this.now = Math.floor(Math.random() * this.len);
      } else if (Array.isArray(this.params.init)) {
        // initが配列で指定されていた場合、その配列内でランダム値を割り当て
        this.now = this.params.init[Math.floor(Math.random() * this.params.init.length)];
        if (!(this.now >= 0)) this.now = 0;
      } else if (this.params.init === -1) {
        // initが-1の場合、nowは-1
        this.now = -1;
      } else if (this.params.init >= 0) {
        // initが正の数値の場合、nowに代入
        this.now = this.params.init;
      } else {
        // initがそれ以外の場合、nowは0
        this.now = 0;
      }
    }

    // init_hideが設定されていない場合、即座に表示
    if (!this.params.init_hide) {
      this.slide.filter((el, i) => {
        if (i === this.now) {
          el.classList.add('Slider__slide--now');
          el.classList.add('Slider__slide--show');
        }
      });
    }
  }

  initialize() {
    const self = this;

    if (this.slider.style.position === 'static') this.slider.style.position === 'relative';

    if (this.params.direct) {
      this.prevBtn = document.createElement('a');
      this.nextBtn = document.createElement('a');
      const prevSpan = document.createElement('span');
      const nextSpan = document.createElement('span');

      const setDirect = (el) => {
        el.href = '#';
        el.classList.add('Slider__arrow');
        el.style.display = 'block';
      };

      setDirect(this.prevBtn);
      setDirect(this.nextBtn);

      this.slider.append(this.prevBtn);
      this.slider.append(this.nextBtn);
      this.prevBtn.classList.add('Slider__arrow--prev');
      this.nextBtn.classList.add('Slider__arrow--next');
      this.prevBtn.append(prevSpan);
      this.nextBtn.append(nextSpan);
    }

    if (this.params.controller === true) {
      this.controllers = document.createElement('ul');

      this.controllers.setAttribute('class', 'Slider__controllers');

      for (let i = 0; i < this.len; i++) {
        let controller = document.createElement('li');
        controller.setAttribute('class', 'Slider__controller');
        this.controllers.appendChild(controller);
      }

      this.slider.appendChild(this.controllers);

      this.controller = Array.from(this.controllers.querySelectorAll('.Slider__controller'));
      this.controller.forEach((el, i) => {
        if (i === this.now) el.classList.add('Slider__controller--now');
      });
    } else if (this.params.controller === 'manual') {
      this.controllers = this.params.slider.querySelector('.Slider__controllers');
      this.controller = Array.from(this.controllers.querySelectorAll('.Slider__controller'));
      this.controller.forEach((el, i) => {
        if (i === this.now) el.classList.add('Slider__controller--now');
      });
    }

    switch (this.params.type) {
      case 'slide':
      default:
        this.slide.filter((el, i) => {
          if (i === 0) el.style.display = 'inline-block';
        });

        requestAFrame(() => {
          this.params.type = 'slide';

          const props = {
            box: {
              position: 'relative',
              top: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: 0,
              'padding-bottom':
                (this.slide[0].clientHeight / this.slide[0].clientWidth) * 100 + '%',
              // 'overflow': this.params.visible_len >= 2 ? null : 'hidden',
            },
            slides: {
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            },
            slide: {
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'block',
            },
          };

          this.addStyle(this.box, props.box);
          this.addStyle(this.slides, props.slides);

          if (this.params.custom_dist)
            gsap.set(this.slides, {
              xPercent: -this.now * this.params.custom_dist,
            });
          else gsap.set(this.slides, { xPercent: -this.now * 100 });

          this.slide.forEach((el, i) => {
            this.addStyle(el, props.slide);
            el.classList.add('Slider__slide--' + (i + 1));
          });

          for (let i = 0; i < this.params.visible_len; i++) {
            let eq = this.len - i * 1 - 1;
            this.slides.prepend(this.slide[eq].cloneNode(true));
            // this.slides.append(this.slide[i].cloneNode(true));
            this.slides.appendChild(this.slide[i].cloneNode(true));
          }

          Array.prototype.slice.call(this.slides.children).forEach((el, i) => {
            el.style.left = ((i - ((self.params.visible_len + 1) / 2)) * 100) + '%';
          });

          // Array.prototype.slice.call(this.slides.children).forEach((el, i) => {
          //   let halfofVisibleLength;

          //   if (this.params.visible_len > 1) {
          //     halfofVisibleLength = (self.params.visible_len + 3) / 2;
          //   } else {
          //     halfofVisibleLength = (self.params.visible_len + 1) / 2;
          //   }

          //   let amount = (i - halfofVisibleLength) * 100;
          //   el.style.left = `${amount}%`;
          // });
        });
        break;

      case 'fade':
        const propsFade = {
          slider: {
            position: 'relative',
            // 'width': '100%',
            // 'height': '100%',
          },
          box: {
            position: 'relative',
            width: '100%',
            height: '100%',
            // 'padding-bottom': (this.slide[0].clientHeight / this.slide[0].clientWidth) * 100 + '%',
            'z-index': 0,
          },
          slides: {
            position: 'absolute',
            top: '0',
            left: '0',
            inset: 0,
            margin: 'auto',
            width: '100%',
            height: '100%',
          },
          slide: {
            position: 'absolute',
            inset: 0,
            margin: 'auto',
            // 'display': 'none',
            opacity: '0',
            width: '100%',
            height: '100%',
            'z-index': 0,
            // 'transition': `width ${this.params.duration}ms ease-out`,
          },
        };

        this.addStyle(this.slider, propsFade.slider);
        this.addStyle(this.box, propsFade.box);
        this.addStyle(this.slides, propsFade.slides);
        this.slide.forEach((el, i) => {
          this.addStyle(el, propsFade.slide);
          el.classList.add(`Slider__slide--${i + 1}`);
          if (i !== this.now) el.style.opacity = 0;
          else el.style.display = 'block';
        });

        if (!this.params.init_hide) {
          this.slide.filter((el, i) => {
            // if (i === this.now) el.style.display = 'block';
            if (i === this.now) el.style.opacity = '1';
          });
        }
        break;

      case 'custom_fade':
        const props_custom_fade = {
          slider: {
            width: '100%',
            height: '100%',
          },
          box: {
            position: 'relative',
            width: '100%',
            height: 0,
            'padding-bottom':
              (this.slide[0].clientHeight / this.slide[0].clientWidth) * 100 +
              '%',
            // 'z-index': 0,
          },
          slides: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            margin: 'auto',
            width: '100%',
            height: '100%',
          },
          slide: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            margin: 'auto',
            display: 'none',
            width: '100%',
            height: '100%',
            // 'z-index': 0,
            // 'transition': `width ${this.params.duration}ms ease-out`,
          },
        };

        this.addStyle(this.slider, props_custom_fade.slider);
        this.addStyle(this.box, props_custom_fade.box);
        this.addStyle(this.slides, props_custom_fade.slides);
        this.slide.forEach((el, i) => {
          this.addStyle(el, props_custom_fade.slide);
          el.classList.add(`Slider__slide--${i + 1}`);
          if (i !== this.now) el.style.opacity = 1;
          else el.style.display = 'block';
        });

        if (!this.params.init_hide) {
          this.slide.filter((el, i) => {
            if (i === this.now) el.style.display = 'block';
          });
        }
        break;

      case 'crop':
        const propsCrop = {
          box: {
            position: 'relative',
            'z-index': 0,
          },
          slides: {
            width: '100%',
            height: '100%',
            display: 'block',
          },
          slide: {
            position: 'absolute',
            inset: 0,
            display: 'block',
            'z-index': 0,
            overflow: 'hidden',
            transition: `width ${this.params.duration}ms ease-out`,
          },
        };

        this.addStyle(this.box, propsCrop.box);
        this.addStyle(this.slides, propsCrop.slides);
        this.slide.forEach((el, i) => {
          this.addStyle(el, propsCrop.slide);

          el.firstElementChild.style.position = 'absolute';

          let direction;
          switch (this.params.crop_init) {
            case 'left':
              el.firstElementChild.style.left = 0;
              el.style.right = 'auto';
              direction = 'horizontal';
              break;
            case 'right':
              el.firstElementChild.style.right = 0;
              el.style.left = 'auto';
              direction = 'horizontal';
              break;
            case 'top':
              el.firstElementChild.style.top = 0;
              el.style.bottom = 'auto;';
              direction = 'vertical';
              break;
            case 'bottom':
              el.firstElementChild.style.bottom = 0;
              el.style.top = 'auto';
              direction = 'vertical';
              break;
          }

          switch (direction) {
            case 'horizontal':
              el.firstElementChild.style.width = `${el.clientWidth}px`;
              el.style.width = 0;
              break;
            case 'vertical':
              el.firstElementChild.style.height = `${el.clientHeight}px`;
              el.style.height = 0;
              break;
          }

          el.classList.add(`Slider__slide--${i + 1}`);
        });

        if (!this.params.init_hide) {
          this.slide.filter((el, i) => {
            if (i === this.now) {
              el.style.display = 'block';
              el.style.width = '100%';
            }
          });
        }
        break;
    }
    if (typeof this.params.initialize_after === 'function') this.params.initialize_after();
  }

  eventHandler() {
    const self = this;

    if (self.params.click_next) this.clickEventHandler();
    if (self.params.swipe) this.touchEventHandler(this.slider);
    if (this.params.direct) this.directEventHandler();
    if (this.params.controller) this.controllerEventHandler();
  }

  clickEventHandler() {
    this.slide.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.next();
      });
    });
  }

  touchEventHandler(target) {
    let self = this,
      touchStart = [],
      touchDelta = [];

    target.addEventListener('touchstart', (e) => start(e), { passive: false });
    target.addEventListener('touchmove', (e) => move(e), { passive: false });
    target.addEventListener('touchcancel', (e) => cancel(e), { passive: false });
    target.addEventListener('touchend', (e) => end(e), { passive: false });

    const start = (e) => {
      let x = e.changedTouches
        ? e.changedTouches[0].pageX
        : e.originalEvent.changedTouches[0].pageX,
        y = e.changedTouches ? e.changedTouches[0].pageY : e.originalEvent.changedTouches[0].pageY;

      touchStart = [x, y];
    };

    const move = (e) => {
      if (!touchStart) return;

      let x = e.changedTouches
        ? e.changedTouches[0].pageX
        : e.originalEvent.changedTouches[0].pageX,
        y = e.changedTouches ? e.changedTouches[0].pageY : e.originalEvent.changedTouches[0].pageY;

      touchDelta = [x - touchStart[0], y - touchStart[1]];

      if (Math.abs(touchDelta[0]) > 50 && Math.abs(touchDelta[1]) < 50) {
        e.preventDefault();

        if (touchDelta[0] > 100) {
          self.prev();
          touchStart = [];
          touchDelta = [];
        } else if (touchDelta[0] < -100) {
          self.next();
          touchStart = [];
          touchDelta = [];
        }
      }
    };

    const cancel = (e) => {
      touchDelta = [];
    };

    const end = (e) => {
      if (!touchDelta) return;

      if (touchDelta[0] > 50) self.prev();
      else if (touchDelta[0] < -50) self.next();

      touchStart = [];
      touchDelta = [];
    };
  }

  directEventHandler() {
    const self = this;

    this.prevBtn.addEventListener('click', (e) => {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();

      if (self.params.addClassClick) {
        this.prevBtn.classList.remove('is-prev');
        setTimeout(() => this.prevBtn.classList.add('is-prev'), 10);
      }
      self.prev();
    });

    this.nextBtn.addEventListener('click', (e) => {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();

      if (self.params.addClassClick) {
        this.nextBtn.classList.remove('is-next');
        setTimeout(() => this.nextBtn.classList.add('is-next'), 10);
      }
      self.next();
    });
  }

  prev() {
    if (!this.params.infinite && this.now === 0) {
      this.change(this.now + 1, 'next');
      return;
    }
    this.change(this.now - 1, 'prev');
  }

  next() {
    if (!this.params.infinite && this.now === this.len - 1) {
      this.change(this.now - 1, 'prev');
      return;
    }
    this.change(this.now + 1, 'next');
  }

  controllerEventHandler() {
    const self = this;
    self.controller.forEach((el, i) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        self.change(i);
      });
    });
  }

  change(target, direct) {
    const self = this;

    if (target === this.now) return;
    if (this.animating) return;
    this.animating = true;

    let before = this.now,
      after = target,
      loop;

    if (after < 0) after = this.len - 1;
    if (after >= this.len) after = 0;

    if (this.params.controller) {
      this.controller.forEach((el, i) => {
        if (i === before) {
          el.classList.remove('Slider__controller--now');
          el.classList.remove('Slider__controller--prev');
          el.classList.remove('Slider__controller--next');
        }
        if (i === after) el.classList.add('Slider__controller--now');
      });

      if (this.params.controllerCreateElement) {
        if (after !== 0) {
          this.controller.forEach((el, i) => {
            if (i === after - 1) el.classList.add('Slider__controller--prev');
          });
        }
        this.controller.forEach((el, i) => {
          if (i === after + 1) el.classList.add('Slider__controller--next');
        });
      }
    }

    this.custom_autoplay_interval = this.params.autoplay_interval;

    switch (this.params.type) {
      case 'slide':
        gsap.to(this.slides, {
          xPercent: this.params.custom_dist ? -target * self.params.custom_dist : -target * 100,
          ease: this.params.ease ? this.params.ease : ease,
          duration: this.params.duration ? this.params.duration / 1000 : 0.7,
          onStart: () => {
            this.slide.filter((el, i) => {
              if (i === before) el.classList.remove('Slider__slide--now');
              if (i === after) {
                el.classList.add('Slider__slide--now', 'Slider__slide--show');
                if (typeof self.params.before_change === 'function')
                  self.params.before_change(after, before, direct);
              }
            });
          },
          onComplete: () => {
            this.slide.filter((el, i) => {
              if (i === before) el.classList.remove('Slider__slide--show');
            });

            gsap.to(self.slides, {
              xPercent: this.params.custom_dist ? -after * self.params.custom_dist : -after * 100,
              duration: 0,
            });

            if (typeof self.params.after_change === 'function')
              self.params.after_change(after, before, direct);

            self.now = after;
            self.animating = false;

            if (self.params.autoplay) {
              clearTimeout(self.interval);
              self.interval = setTimeout(
                () => self.next(),
                self.custom_autoplay_interval - self.params.duration
              );
            }
          },
        });

        break;
      case 'fade':
        this.slide.filter((el, i) => {
          if (i === after) {
            el.style.opacity = 0;
            el.style.pointerEvents = 'auto';
            el.style.display = 'block';
            el.style.zIndex = 5;
          }
        });

        loop = (() => {
          requestAFrame(() => {
            if (this.slide[after].style.pointerEvents === 'none') {
              loop();
              return;
            }

            this.slide.filter((el, i) => {
              if (i === before) {
                el.classList.remove('Slider__slide--now');
                gsap.to(el, {
                  opacity: 0,
                  ease: this.params.ease ? this.params.ease : ease,
                  duration: this.params.duration ? this.params.duration / 1000 : 0.7,
                });
              }
              if (i === after) {
                gsap.to(el, {
                  opacity: 1,
                  ease: this.params.ease ? this.params.ease : ease,
                  duration: this.params.duration ? this.params.duration / 1000 : 0.7,
                });
                el.classList.add('Slider__slide--now', 'Slider__slide--show');
                if (typeof self.params.before_change === 'function')
                  self.params.before_change(after, before, direct);
              }
            });

            if (typeof self.params.custom_change === 'function')
              self.params.custom_change(after, before, direct);

            setTimeout(() => {
              requestAFrame(() => {
                this.slide.filter((el, i) => {
                  if (i === before) el.classList.remove('Slider__slide--show');
                  if (i === self.now) {
                    el.style.pointerEvents = 'none';
                    el.style.display = 'none';
                  }
                  if (i === after) el.style.zIndex = 0;
                });

                if (typeof self.params.after_change === 'function')
                  self.params.after_change(after, before, direct);

                self.now = after;
                self.animating = false;

                if (self.params.autoplay) {
                  clearTimeout(self.interval);
                  self.interval = setTimeout(
                    () => self.next(),
                    self.custom_autoplay_interval - self.params.duration
                  );
                }
              });
            }, self.params.duration);
          });
        })();
        break;

      case 'custom_fade':
        const props = {
          opacity: 0,
          pointerEvents: 'auto',
          display: 'block',
          zIndex: after + 1,
        };

        this.slide.filter((el, i) => {
          if (i === after) this.addStyle(el, props);
        });

        loop = (() => {
          requestAFrame(() => {
            if (this.slide[after].style.pointerEvents === 'none') {
              loop();
              return;
            }

            this.slide.filter((el, i) => {
              if (i === before) el.classList.remove('Slider__slide--now');
              if (i === after) {
                gsap.to(el, {
                  opacity: 1,
                  ease: this.params.ease ? this.params.ease : ease,
                  duration: this.params.duration
                    ? this.params.duration / 1000
                    : 0.7,
                });
                el.classList.add('Slider__slide--now');
                el.classList.add('Slider__slide--show');
              }
              if (typeof self.params.before_change === 'function')
                self.params.before_change(after, before, direct);
            });

            if (typeof self.params.custom_change === 'function')
              self.params.custom_change(after, before, direct);

            setTimeout(() => {
              requestAFrame(() => {
                this.slide.filter((el, i) => {
                  if (i === before) el.classList.remove('Slider__slide--show');
                  if (i === self.now) el.style.pointerEvents = 'none';
                  if (after >= this.len - 1) {
                    el.style.zIndex = 0;
                  }
                  // if (after >= this.len - 1) el.style.zIndex = 0;
                });

                if (typeof self.params.after_change === 'function')
                  self.params.after_change(after, before, direct);

                self.now = after;
                self.animating = false;

                if (self.params.autoplay) {
                  clearTimeout(self.interval);
                  self.interval = setTimeout(
                    () => self.next(),
                    self.custom_autoplay_interval - self.params.duration,
                  );
                }
              });
            }, self.params.duration);
          });
        })();
        break;

        
      case 'crop':
        this.slide.filter((el, i) => {
          if (i === after) {
            el.style.zIndex = 5;
            el.style.pointerEvents = 'auto';
            el.style.display = 'block';
            el.style.width = 0;

            el.firstElementChild.style.position = 'absolute';
            el.firstElementChild.style.left = 0;
            el.firstElementChild.style.width = `${this.params.crop_init === 'left' || 'right'
              ? this.slides.clientWidth
              : this.slides.clientHeight
              }px`;
          }
        });

        loop = (() => {
          requestAFrame(() => {
            if (this.slide[after].style.pointerEvents === 'none') {
              loop();
              return;
            }

            this.slide.filter((el, i) => {
              if (i === before) el.classList.remove('Slider__slide--now');
              if (i === after) {
                el.classList.add('Slider__slide--now', 'Slider__slide--show');
                el.style.width = '100%';
              }
            });

            if (typeof this.params.before_change === 'function')
              this.params.before_change(after, before, direct);

            setTimeout(() => {
              this.slide.filter((el, i) => {
                if (i === before) el.style.left = 0;
              });
              requestAFrame(() => {
                this.slide.filter((el, i) => {
                  if (i === before) el.classList.remove('Slider__slide--show');
                  if (i === self.now) {
                    el.style.pointerEvents = 'none';
                    el.style.display = 'none';
                  }
                  if (i === after) el.style.zIndex = 0;
                });

                if (typeof self.params.after_change === 'function')
                  self.params.after_change(after, before, direct);

                self.now = after;
                self.animating = false;

                if (self.params.autoplay) {
                  clearTimeout(self.interval);
                  self.interval = setTimeout(
                    () => self.next(),
                    self.custom_autoplay_interval - self.params.duration
                  );
                }
              });
            }, self.params.duration);
          });
        })();
        break;
      default:
    }
  }

  autoPlay() {
    this.params.autoplay = true;
    this.custom_autoplay_interval = this.params.autoplay_interval;
    this.interval = setTimeout(() => this.next(), this.params.autoplay_delay);
  }

  play() {
    this.params.autoplay = true;
    this.next();
  }

  pause() {
    this.params.autoplay = false;
    clearTimeout(this.interval);
  }
}

export default ~((_) => (window.mSlider = mSlider))``;
