import Masonry from 'masonry-layout';

export default class MasonryiUi {

  constructor(){
    this.mm = gsap.matchMedia();
    this.mq_sp = `(max-width: 767px)`;
    this.mq_pc = `(min-width: 768px)`;
    this.cmd = { isPc: this.mq_pc, isSp: this.mq_sp };
  }

  init(){
    this.masonryUi();
  }

  masonryUi(){
    this.mm.add( this.cmd,
      (context) => {
        const { isPc, isSp } = context.conditions;
        console.log('masonryUi')
        const elem = document.querySelector('.masonry');
        const msnry = new Masonry( elem, {
          // options
          // columnWidth: width
          itemSelector: '.topContents__item',
          percentPosition: true,
          gutter: ".gutter-sizer",
        });        
      }
    );

  }
}