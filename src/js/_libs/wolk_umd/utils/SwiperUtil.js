export default class SwiperUtil{

  static allSwiper=[];
  static isConsole = false;

  static addGsapInvew(targetCls,swiper,startPos="top bottom"){
    swiper.autoplay.stop();
    ScrollTrigger.batch(targetCls, {
      onEnter: (elements, triggers) => {
        if(SwiperUtil.isConsole)
          console.log(targetCls,"onEnter  start");
        swiper.autoplay.start();
      },
      onEnterBack: (elements, triggers) => {
        if(SwiperUtil.isConsole)
          console.log(targetCls,"onEnterBack  start");
        swiper.autoplay.start();
      },
      onLeave: (elements, triggers) => {
        if(SwiperUtil.isConsole)
          console.log(targetCls,"onLeave  stop");
        swiper.autoplay.stop();
      },
      onLeaveBack: (elements, triggers) => {
        if(SwiperUtil.isConsole)
          console.log(targetCls,"onLeaveBack  stop");
        swiper.autoplay.stop();
      },
      start: startPos,
      // once: false
      // markers: true,
    });
  }

}