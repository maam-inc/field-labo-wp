export default class GsapUtil{

  //ScrollTriger Refresh LazyImg
  static refreshLazyLoad(){
    const lazyImages = Array.from(document.querySelectorAll("img[loading='lazy']"));
    lazyImages.forEach(function (lazyImage) {
      lazyImage.addEventListener('load', function () {
        ScrollTrigger.refresh();
      });
    });
  }

  static setScrlScrub(target,scrubPer=1.2,ease="power3.out",tweenProps={y:0},initProps=null,markers=false,start='top bottom',end='bottom top'){
    if(initProps!=null)
      gsap.set(target, {...initProps});
    gsap.to(target, {
      ...tweenProps,
      scrollTrigger: {
        trigger: target,
        start: start,
        end: end,
        scrub: scrubPer,
        ease:ease,
        markers: markers
      }
    });
  }
  static setScrlScrubAll(targetAll,scrubPer=1.2,ease="power3.out",tweenProps={y:0},initProps=null,markers=false){

    let elms = document.querySelectorAll(targetAll);
    elms.forEach(function (elm, index) {
      if(initProps!=null)
        gsap.set(elm, {...initProps});
      gsap.to(elm, {
        ...tweenProps,
        scrollTrigger: {
          trigger: elm,
          start: 'top bottom',
          end: 'bottom top',
          scrub: scrubPer,
          ease:ease,
          markers: markers
        }
      });
    });


  }

  static setScrlTrigger(trigger,tweenFunc,start="top bottom",initProps=null,markers=false,once=true,opt={}){
    if(initProps!=null)
      gsap.set(trigger, {...initProps});
    ScrollTrigger.batch(trigger, {
      onEnter: (elements, triggers) => {
        for (let i = 0; i < elements.length; i++) {
          tweenFunc(elements[i],opt);
          // console.log("onEnter:::",elements[i]);
        }
      },
      start: start,
      markers: markers,
      once: once
    });
  }

}