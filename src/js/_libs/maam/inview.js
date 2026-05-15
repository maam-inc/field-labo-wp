export default class Inview {
  //intersection-observer poolyfill必須
  handler(PARAM) {
    const SELECTOR = Array.from(document.querySelectorAll(PARAM.selector));

    const camelCase = (str) => {
      str = str.charAt(0).toLowerCase() + str.slice(1);
      return str.replace(/[-_.](.)/g, (match, group1) => {
        return group1.toUpperCase();
      });
    };

    const func = {
      OPTIONS: PARAM.options,

      _init: (target, index) => PARAM.init(target, index),

      _enter: (target, index) => PARAM.enter(target, index),

      _leave: (target, index) => PARAM.leave(target, index),

      cb: (entries, observer) => {
        entries.forEach((entry) => {
          let index = parseInt(entry.target.getAttribute('data-' + camelCase(PARAM.selector)));

          if (PARAM.infinite) {
            if (entry.isIntersecting) {
              entry.target.classList.add('inview--enter');
              if (PARAM.enter) func._enter(entry.target, index);
            } else {
              entry.target.classList.remove('inview--enter');
              if (PARAM.leave) func._leave(entry.target, index);
            }
          } else {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('inview--enter');

            if (PARAM.enter) func._enter(entry.target, index);
            observer.unobserve(entry.target);
          }
        });
      },
    };

    const observer = new IntersectionObserver(func.cb, func.OPTIONS);

    SELECTOR.forEach((elm, index) => {
      elm.setAttribute('data-' + camelCase(PARAM.selector), index);
      if (PARAM.init) func._init(elm, index);
      observer.observe(elm, index);
    });
  }

  constructor(param) {
    const DEFAULT = {
      selector: 'inview',
      options: {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: [1.0],
      },
      infinite: false,
      init: null,
      enter: null,
      leave: null,
    };

    // const OPTION = {
    //   selector: param.selector,
    //   options: {
    //     root: param.root,
    //     rootMargin: param.rootMargin,
    //     threshold: [param.threshold],
    //   },
    //   infinite: true,
    //   init: () => {},
    //   enter: () => {},
    //   leave: () => {},
    // };

    this.handler(Object.assign({}, DEFAULT, param));
  }
}