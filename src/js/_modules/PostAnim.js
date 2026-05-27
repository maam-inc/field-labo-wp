export default class PostAnim {
  constructor() {
    this.mq = window.matchMedia('(min-width: 768px)');
    this.targets = [
      { selector: '.article .main__title', charClass: 'main__title-char' },
    ];
  }

  init() {
    this.setupTyping();
    this.runTyping();
  }

  setupTyping(){
    this.targets.forEach(({ selector, charClass }) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const text = el.textContent;
      el.textContent = '';
      Array.from(text).forEach((ch) => {
        const span = document.createElement('span');
        span.className = charClass;
        span.textContent = ch;
        el.appendChild(span);
      });
    });
  };

  runTyping(){
    const startDelay = 400; 
    const charInterval = 50;
    this.targets.forEach(({ selector, charClass }) => {
      const chars = document.querySelectorAll(`${selector} .${charClass}`);
      chars.forEach((span, i) => {
        setTimeout(() => {
          span.classList.add('is-shown');
        }, startDelay + i * charInterval);
      });
    });
  };
}
