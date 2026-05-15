export default class Mutil {
  constructor() {
    this.device = this.deviceCheck();
    this.browser = this.browserCheck();

    this.BREAKPOINT = 768;
    this.winW = document.documentElement.clientWidth;
    this.winH  = document.documentElement.clientHeight; // IOS対応したい。
    this.displayMode = this.winW > this.BREAKPOINT ? 'pc' : 'sp';

    this.eventHandler
  }

  eventHandler = () => {
    window.addEventListener('resize', this.getClientInfo);
  }

  getClientInfo = () => {
    this.winW = document.documentElement.clientWidth;
    this.winH = document.documentElement.clientHeight;
    this.displayMode = this.winW > this.BREAKPOINT ? 'pc' : 'sp';
    this.device = this.deviceCheck();
    this.browser = this.browserCheck();
  };

  deviceCheck = () => {
    const ua = navigator.userAgent;
    if (
      ua.indexOf('iPhone') > 0 ||
      (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)
    )
      return 'sp';

    if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) return 'tablet';

    return 'pc';
  };

  browserCheck = () => {
    const ua = navigator.userAgent;
    const browser = ua.toLowerCase();

    if (this.device === 'sp') {
      if (browser.indexOf('iphone') !== -1) return 'ios';

      return 'android';
    }

    if (browser.indexOf('msie') !== -1 || browser.indexOf('trident') !== -1)
      return 'ie';
    if (browser.indexOf('edge') !== -1) return 'edge';
    if (browser.indexOf('chrome') !== -1) return 'chrome';
    if (browser.indexOf('safari') !== -1) return 'safari';
    if (browser.indexOf('firefox') !== -1) return 'firefox';
    if (browser.indexOf('opera') !== -1) return 'opera';

    return 'unkown';
  };

  hoverEventHandler = () => {
    const anchorArray = Array.from(document.getElementsByTagName('a'));
    const buttonArray = Array.from(document.getElementsByTagName('button'));
    const listArray = Array.from(document.getElementsByClassName('list'));

    const enter = (el) => {
      if (this.device === 'pc') el.classList.add('m-hover');
    };

    const leave = (el) => {
      if (this.device === 'pc') el.classList.remove('m-hover');
    };

    anchorArray.forEach((element) => {
      element.addEventListener('mouseenter', () => enter(element), {
        passive: false,
      });

      element.addEventListener('touchstart', () => enter(element), {
        passive: false,
      });
      element.addEventListener('mouseleave', () => leave(element), {
        passive: false,
      });
      element.addEventListener('touchend', () => leave(element), {
        passive: false,
      });
      element.addEventListener('touchcancel', () => leave(element), {
        passive: false,
      });
    });

    buttonArray.forEach((element) => {
      element.addEventListener('mouseenter', () => enter(element), {
        passive: false,
      });

      element.addEventListener('touchstart', () => enter(element), {
        passive: false,
      });
      element.addEventListener('mouseleave', () => leave(element), {
        passive: false,
      });
      element.addEventListener('touchend', () => leave(element), {
        passive: false,
      });
      element.addEventListener('touchcancel', () => leave(element), {
        passive: false,
      });
    });

    listArray.forEach((element) => {
      element.addEventListener('mouseenter', () => enter(element), {
        passive: false,
      });

      element.addEventListener('touchstart', () => enter(element), {
        passive: false,
      });
      element.addEventListener('mouseleave', () => leave(element), {
        passive: false,
      });
      element.addEventListener('touchend', () => leave(element), {
        passive: false,
      });
      element.addEventListener('touchcancel', () => leave(element), {
        passive: false,
      });
    });
  };

  measure = (name, func) => {
    const start = performance.now();
    func();
    const end = performance.now();

    const elapsed = end - start;
    const elapsedStr = elapsed.toPrecision(3);
  };

  fisherYatesShuffle = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = array[i];
      /* eslint-disable no-param-reassign */
      array[i] = array[r];
      array[r] = tmp;
    }

    return array;
  };

  getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  textSplit = (value) => {
    const texts = value.textContent;

    if (!texts) throw new Error('テキストがありません。');
    const textsArray = Array.from(texts);

    value.innerHTML = textsArray
      .map((text) => `<span class="char">${text}</span>`)
      .toString()
      .replace(/,/g, '');
  };

  calcPosition = (target) => {
    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return Math.floor(rect.top + scrollTop);
  };
}
