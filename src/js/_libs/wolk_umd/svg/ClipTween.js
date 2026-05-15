//pug
/*
.hero
  .hero-cont
    //塗りつぶしsvg使用時
    <svg class="overlay" id="menuMask" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <path class="overlay-path" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
    </svg>

    //clipPath使用時
    <svg class="overlay" viewBox="0 0 0 0">
      <clipPath id="menuMask" clipPathUnits="objectBoundingBox"><path class="overlay-path" transform="scale(0.01,0.01)" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" /></clipPath>
    </svg>
  img(src=`${IMG_DIR}block_1_1_mv.jpg`, alt="")
*/

//scss
/*
.hero{
  position: fixed;
  position: relative;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-clip-path: url(#menuMask);
  clip-path: url(#menuMask);

  .hero-cont{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    // background: #000;
  }
  svg{
    display: block;
    fill: #ccc;
    width: 100%;
    height: 100vh;
    pointer-events: none;
  }
}
*/

//js
/*
gsap.delayedCall(1, () => { ClipTween.openCurveTop2Bottom("#menuMask path"); });
gsap.delayedCall(3, () => { ClipTween.closeCurveBottom2Top("#menuMask path"); });

gsap.delayedCall(1, () => { ClipTween.openCurveBottom2Top("#menuMask path"); });
gsap.delayedCall(3, () => { ClipTween.closeCurveTop2Bottom("#menuMask path"); });

*/

//svg pathは100,100で作ってcssでサイズ調整する
// codepen
// https://codepen.io/shirasawa/pen/vYegodM
export default class ClipTween{
  //上から下に開く
  static openCurveTop2Bottom(pathTarget, inTime=0.5,inEase="power4.in",outTime=0.6,outEase="power4.out",){
    gsap.timeline({
      // onComplete: () => (isAnimating = false),
    })
    .set(pathTarget, {
      attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
    })
    .to(
      pathTarget,
      {
        duration: inTime,
        ease: inEase,
        attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
      },
      0
    )
    .to(pathTarget, {
      duration: outTime,
      ease: outEase,
      attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
      // onComplete: () => {

      // },
    })
  }
  //下から上に閉じる
  static closeCurveBottom2Top(pathTarget, inTime=0.5,inEase="power4.in",outTime=0.6,outEase="power4.out",){
    gsap.timeline({
      // onComplete: () => (isAnimating = false),
    })
    .set(pathTarget, {
      attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
    })
    .to(
      pathTarget,
      {
        duration: inTime,
        ease: inEase,
        attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
      },
      0
    )
    .to(pathTarget, {
      duration: outTime,
      ease: outEase,
      attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
      // onComplete: () => {

      // },
    })


  }


  static openCurveBottom2Top(pathTarget, inTime=0.5,inEase="power4.in",outTime=0.6,outEase="power4.out",){
    gsap.timeline({
      // onComplete: () => (isAnimating = false),
    })
    .set(pathTarget, {
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
    })
    .to(
      pathTarget,
      {
        duration: inTime,
        ease: inEase,
        attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
      },
      0
    )
    .to(pathTarget, {
      duration: outTime,
      ease: outEase,
      attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
      // onComplete: () => {

      // },
    })


  }

  static closeCurveTop2Bottom(pathTarget, inTime=0.5,inEase="power4.in",outTime=0.6,outEase="power4.out",){
    gsap.timeline({
      // onComplete: () => (isAnimating = false),
    })
    .set(pathTarget, {
      attr: { d: "M 0 100 V 0 Q 50 0 101 0 V 100 z" },
    })
    .to(
      pathTarget,
      {
        duration: inTime,
        ease: inEase,
        attr: { d: "M 0 100 V 50 Q 50 100 100 50 V 100 z" },
      },
      0
    )
    .to(pathTarget, {
      duration: outTime,
      ease: outEase,
      attr: { d: "M 0 100 V 100 Q 50 100 98 100 V 100 z" },
      // onComplete: () => {

      // },
    })


  }


}
