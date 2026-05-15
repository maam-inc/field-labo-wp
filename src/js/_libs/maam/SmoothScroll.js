export default class SmoothScroll {
  constructor(option) {
    const selectors = Array.from(document.querySelectorAll(option.selector));
    this.params = {
      // container: option.container ?? window,
      duration: option.duration ?? 0,
      ease: option.ease ?? 'power1.out',
      delay: option.delay ?? 0,
      jump: option.jump ?? undefined,
      jumpDelay: option.jumpDelay ?? 0,
      offset: option.offset ?? 0,
      complete: option.complete ?? undefined,
    };

    this.eventHandler(selectors);
  }

  eventHandler = (selectors) => {
    selectors.forEach((element) => {
      element.addEventListener('click', this.clickEvent.bind(this));
    });
  };

  calcTargetPosition = (element) => {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return rect.top + scrollTop;
  };

  getTargetPositionFromHref = (target) => {
    if (target instanceof HTMLAnchorElement) {
      const targetHref = target.getAttribute('href');

      if (targetHref === '#') {
        return 0;
      }

      if (typeof targetHref === 'number') {
        return targetHref;
      }

      if (typeof targetHref === 'string') {
        const element = document.getElementById(targetHref.replace('#', ''));

        return this.calcTargetPosition(element);
      }
    }

    return 0;
  };

  clickEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { currentTarget } = e;

    const targetPosition = this.getTargetPositionFromHref(
      currentTarget,
    );

    const calcOffset = () => {
      const header = document.getElementById('header');

      if(header) {
        this.params.offset = header.clientHeight * 0.75
      }
    }

    calcOffset()
    this.move(targetPosition);
  };

  move = (targetPosition) => {
    const scrollTop =
      document.documentElement.scrollTop ?? document.body.scrollTop;

    if (targetPosition !== scrollTop) {
      setTimeout(() => {
        if (this.params.jump) {
          if (Math.abs(targetPosition - scrollTop) > this.params.jump) {
            if (targetPosition > scrollTop) {
              window.scrollTo(0, targetPosition - this.params.jump);
            } else {
              window.scrollTo(0, targetPosition + this.params.jump);
            }
          }
        }

        const offset = this.params.offset ? this.params.offset: 0;

        gsap.to(window, {
          scrollTo: {
            y:
              targetPosition === 0
                ? targetPosition
                : targetPosition - offset,
          },
          duration: this.params.duration,
          ease: this.params.ease,
          delay: this.params.delay,
          onComplete: () => {
            if (typeof this.params.complete === 'function') {
              this.params.complete();
            }
          },
        });
      }, this.params.jumpDelay);
    }
    
    if (typeof this.params.complete === 'function') {
      this.params.complete();
    }
  };
}
