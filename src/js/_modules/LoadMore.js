export default class LoadMore {

  constructor(){
    this.mm = gsap.matchMedia();
    this.mq_sp = `(max-width: 767px)`;
    this.mq_pc = `(min-width: 768px)`;
    this.cmd = { isPc: this.mq_pc, isSp: this.mq_sp };
  }

  init(){
    this.loadMoreUi();
  }

  loadMoreUi(){
    console.log('loadMoreUi')
    const wrapper = document.querySelector('.jsLoadMoreWrapper');
      const container = document.querySelector(".jsLoadMoreContainer");
      const btn = document.querySelector(".jsLoadMoreBtn");

       const step = 1000; // 1回で増やす高さ
      let current = step;
      // 初期表示の高さ（例：600px）
      const limitHeight = 1000;

      const fullHeight = container.scrollHeight;

      wrapper.style.maxHeight = step + "px";

      btn.addEventListener("click", () => {
        current += step;

        if (current >= fullHeight) {
          wrapper.style.maxHeight = fullHeight + "px";
          btn.style.display = "none";
        } else {
          wrapper.style.maxHeight = current + "px";
        }
      });
  }
}