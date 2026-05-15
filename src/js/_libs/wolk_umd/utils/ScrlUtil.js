export default class ScrlUtil{

  static scrlToTw = (movePos, scrollTime = 1, transitions = "power3.inOut", delay = 0) =>{
    gsap.to($('html,body'),scrollTime,{scrollTop:movePos,ease:transitions,delay:delay});
  }
  static setScrlPos = (pos=0) =>{
    gsap.set($('html,body'),{scrollTop:pos});
  }

  //各コンテンツへのページ内スクロール
  static scrlContents = (targetTag, margin=0, scrlTime = 0.85, ease = "power4.out") =>{
    let movePos = $(targetTag).offset().top+margin;
    // let movePos = $(targetTag).position().top+margin;
    ScrlUtil.scrlToTw(movePos, scrlTime, ease);
  }

  static scrlContentsDiff = (targetTag, margin=0, scrlTime = 0.8, ease = "power4.out",diffPer = 8000) =>{
    // let movePos = $(targetTag).offset().top+margin;
    let movePos = $(targetTag).position().top+margin;
    let currentTop = $(window).scrollTop();
    let diffPos = Math.abs(movePos - currentTop);
    let time = diffPos/diffPer + scrlTime;
    // console.log(movePos,time);
    ScrlUtil.scrlToTw(movePos, time, ease);
  }

  static scrlModalContents = (scrlTarget,targetTag, margin=0, scrlTime = 0.8, ease = "power4.out",diffPer = 8000) =>{
    let movePos = $(targetTag).position().top+margin;
    // let movePos = $(targetTag).offset().top+margin;
    // var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // var top = targetTop + scrollTop;
    // let currentTop = $(window).scrollTop();
    // let diffPos = Math.abs(movePos - currentTop);
    // let time = diffPos/diffPer + scrlTime;
    // console.log(targetTag,movePos,movePos2,targetTop,top);
    // gsap.to($(scrlTarget),scrollTime,{scrollTop:movePos,ease:transitions,delay:delay});

    gsap.set( scrlTarget, {scrollTo: { y: movePos+100}});
    gsap.to( scrlTarget, {duration: scrlTime,ease: 'power4.out',scrollTo: { y: movePos},delay:0});
  }

  //ページトップへのスクロール
  static scrlTop = (scrlTime = 2, ease = "power4.inOut", delay = 0) =>{
    ScrlUtil.scrlToTw(0, scrlTime, ease, delay);
  }

  static scrlPos = (pos,scrlTime = 1, ease = "power3.inOut", delay = 0) =>{
    // gsap.to $('html,body'),scrlTime,{scrollTop:pos,ease:ease}
    ScrlUtil.scrlToTw(pos, scrlTime, ease, delay);
  }

  //ページターゲットIDへのスクロール
  static scrlContentId = (idName,margin=0,scrlTime = 1, ease = "power4.out", delay = 0) =>{
    const content = document.getElementById(idName);
    const contentTop = content.getBoundingClientRect().top + window.pageYOffset;
    const targetPos = contentTop-margin;
    gsap.to(window, { duration: scrlTime, ease: ease, scrollTo: { y: targetPos } });
  }
  static scrlContentIdSkip = (idName,skipDiff=150,margin=0,scrlTime = 0.85, ease = "power4.out", delay = 0) =>{
    const content = document.getElementById(idName);
    const contentTop = content.getBoundingClientRect().top + window.pageYOffset;
    const targetPos = contentTop-margin;
    gsap.set(window, { scrollTo: { y: targetPos-skipDiff} });
    gsap.to(window, { duration: scrlTime, ease: ease, scrollTo: { y: targetPos } });
  }

  //aタグのhref属性から一括設定
  static setPageScrl = (targetContainer, margin=0, scrlTime = 1.2, ease = "power4.inOut") =>{
    $(targetContainer + ' a[href^="#"]').on('click', function(e) {
      let href = $(this).attr('href');
      let movePos = $(href).offset().top+margin;
      ScrlUtil.scrlToTw(movePos, scrlTime, ease);
      return false;
    });
  }

  static setSkipPageScrl = (targetContainer, skipDiff=150, margin=0, scrlTime = 1, ease = "power4.out",delay = 0) =>{

    // $(targetContainer + ' a[href^="#"]').on('click', function(e) {
    $(targetContainer + ' a[href*="#"]').on('click', function(e) {
      let href = $(this).attr('href');
      // let urlHash = href.hash;
      let hash = href.split('#')[1];

      // let target = $(href === '#' || href === '' ? 'html' : href);
      let target = $('#' + hash);

      let movePos = target.offset().top+margin;
      ScrlUtil.scrlToTw(movePos-skipDiff, 0, ease,delay);
      ScrlUtil.scrlToTw(movePos, scrlTime, ease,delay);
      return false;
    });
  }

  //aタグのhref属性から一括設定 距離に応じて時間調整　
  static setPageScrlPer = (targetContainer, margin=0, baseTime = 1, diffPer = 9500, ease = "power4.inOut") =>{
    $(targetContainer + ' a[href^="#"]').on('click', function(e) {
      // if($(this).hasClass("mScroll")){
      //   return;
      // }
      let href = $(this).attr('href');
      let target = $(href === '#' || href === '' ? 'html' : href);
      let movePos = target.offset().top+margin;
      let currentTop = $(window).scrollTop();
      let diffPos = Math.abs(movePos - currentTop);
      let time = diffPos/diffPer + baseTime;

      // console.log(href,target,movePos,time);
      ScrlUtil.scrlToTw(movePos, time, ease);
      return false;
    });
  }

  static scrlStop= (e)=>{
    e.preventDefault();
  }
  static noScroll= ()=>{
    document.addEventListener('touchmove', ScrlUtil.scrlStop, {passive: false});
    document.addEventListener('wheel', ScrlUtil.scrlStop, {passive: false});
  }
  static noScrollOff= ()=>{
    document.removeEventListener('touchmove', ScrlUtil.scrlStop, {passive: false});
    document.removeEventListener('wheel', ScrlUtil.scrlStop, {passive: false});
  }

  //スクロールイベント無効(スクロール禁止)PC用
  // static noScrlPc = ()=>{
  //   let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  //   $(document).on(scroll_event, (e) =>{
  //     e.preventDefault()
  //   });
  // }
  // //sp用
  // static noScrlSp = ()=>{
  //   $(document).on('touchmove.noScroll', (e) =>{
  //     e.preventDefault()
  //   });
  // }
  // //スクロール復活 PC用
  // static noScrlOffPc = ()=>{
  //   let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  //   $(document).off(scroll_event);
  // }
  // //スクロール復活 SP用
  // static noScrlOffSp = ()=>{
  //   $(document).off('.noScroll');
  // }
}
