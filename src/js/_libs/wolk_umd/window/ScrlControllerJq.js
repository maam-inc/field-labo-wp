
/* ForUse
***** wolk/event/EventEmitterを使用 *****
function scrlUpdate(e){
  // console.log("scrlUpdate!!!",e.scrlTop,e.totalPer);
}
function changeContents(e){
  // console.log("changeContents!!!",e.tag,e.id,e.isNext);
}
function areaUpdate(e){
  // console.log("changeContents!!!",e.tag,e.id,e.per);
}
function targetIn(e){
  console.log("targetIn:::",e.target);
}
function targetOut(e){
  console.log("targetOut:::",e.target,e.param);
}

$ ->
  let scrl = new ScrlControllerJq()
  // scrl.initialize(["#contents1","#contents2","#contents3","#contents4","#contents5"])
  //初期設定必須
  scrl.initialize()

  // ##スクロールイベント設定
  //scrl.initScroll(true)
  // ##イベント
  //scrl.evt.addListener("SCRL_UPDATE",scrlUpdate)
  // ##↓オプション
  // scrl.useChange()
  // scrl.evt.addListener("CHANGE_CONTENTS",changeContents)
  // 各コンテンツエリアごとの割合など取得
  //scrl.useUpdateArea()
  //scrl.evt.addListener("AREA_UPDATE",areaUpdate)

  //ターゲットがフェードインしたか
  //scrl.useUpdateTarget(".fadeIn",0,false,false)
  //scrl.evt.addListener("TARGET_IN",targetIn)
  //scrl.evt.addListener("TARGET_OUT",targetOut)
  // // ##初期コンテンツセット
  // scrl.setUpInitContents()
 */
import EventEmitter from "/es6/wolk_umd/event/EventEmitter";
 export default class ScrlControllerJq {

   currentNum = 0;
   currentCont = null;
   evt = null;
   areaList = [];

   isFirstInit = true;
   isDispatchScrl = false;
   isUseChanageContents = false;
   isUseAreaUpdate = false;
   isUseTargetUpdate = false;
   isUseTargetInOnce = true;
   targetCLS = null;
   targetInMargin = 0;
   targetOutMargin = 0;
   isUseAfterOut = false;

   scrlTopOld = 0;
   isUseBeforeChange = false;
   isScrlMove = false;
   //tween中にアップデートするか
   isMoveUpdateMode = true;

   constructor() {}
   initialize(areaList=[]) {
     if (this.isFirstInit) {
       if (areaList) {
         this.currentCont = areaList[0];
         this.areaList = areaList;
       }
       this.evt = new EventEmitter();
       this.isFirstInit = false;
     }
   }

   //初回にするセットアップ(オプション)
   initScroll(isDispatch=false, isMoveUpdate=true) {
    //  console.log("isDispatch",isDispatch);
      // _scrollUpdateをemitするか
     this.isDispatchScrl = isDispatch;
    //  console.log("this.isDispatchScrl",this.isDispatchScrl);
     this.isMoveUpdateMode = isMoveUpdate;
     $(window).scroll(this._scrollUpdate);
   }

   //スクロール位置で初期コンテンツを任意でセットアップ #追加151108
   setUpInitContents() {
     let currentBottom, currentCount, currentTop, i, isNext, j, len, ref, scrlTop, val;
     scrlTop = $(window).scrollTop();
     currentCount = 0;
     ref = this.areaList;
     for (i = j = 0, len = ref.length; j < len; i = ++j) {
       val = ref[i];
       currentTop = $(val).offset().top;
       currentBottom = currentTop + $(val).height();
       if (scrlTop >= currentBottom) {
         currentCount = i + 1;
       }
     }
     this.currentNum = currentCount;
     this.currentCont = this.areaList[currentCount];
     isNext = this.scrlTopOld < scrlTop ? true : false;
     this.evt.emit("CHANGE_CONTENTS", {
       tag: this.currentCont,
       id: this.currentNum,
       isNext: isNext
     });
   }

   //changeContentsを使用する場合(オプション)
   useChange(beforeChangeMode=false) {
     //スクロールでのバック時の切り替えポイントを前のコンテンツにするか
     this.isUseBeforeChange = beforeChangeMode;
     this.isUseChanageContents = true;
   }
   //各エリアのパーセンテージ使用時(オプション)
   useUpdateArea() {
     this.isUseAreaUpdate = true;
   }

   //各要素が画面外から入ったタイミング(オプション)#追加151007
   useUpdateTarget(targetCls,marginInY=0,isOnce=true,isAfterOut=false,marginOutY=0) {
     this.targetCLS = $(targetCls);
     this.targetInMargin = marginInY;
     this.isUseTargetUpdate = true;
     //一回だけ実行
     this.isUseTargetInOnce = isOnce;
     //次のコンテンツ以降時を利用
     this.isUseAfterOut = isAfterOut;
     this.targetOutMargin = marginOutY;
   }

   //////////////////////// PRIVATE
   // 各コンテンツトップが切り替わった時
   _changeContents(num, isNext) {
     if (num !== this.currentNum) {
       if (num < this.areaList.length && num >= 0) {
         this.currentNum = num;
         this.currentCont = this.areaList[this.currentNum];
         this.evt.emit("CHANGE_CONTENTS", {
           tag: this.currentCont,
           id: this.currentNum,
           isNext: isNext
         });
       }
     }
   }

   _scrollUpdate = (e) => {
    //  console.log("scrollUpdate",e);
     let _area, areaH, areaParcent, areaScrTop, beforeContentsH, beforeNum, currentBottom, currentTop, i, j, len, marginH, nowY, ref, scrlTop, totalScrlPer, winH;
     if (this.isScrlMove && !this.isMoveUpdateMode) {//追加151108
       return;
     }
    //  console.log(this.isMoveUpdateMode);
     scrlTop = $(window).scrollTop();
     totalScrlPer = scrlTop / ($(document).height() - $(window).innerHeight()) * 100;
     nowY = $(window).innerHeight() + $(window).scrollTop();
     if (this.isDispatchScrl) {
      //  console.log(scrlTop,totalScrlPer);
       this.evt.emit("SCRL_UPDATE", {
         scrlTop: scrlTop,
         totalPer: totalScrlPer
       });
     }
     if (this.isUseChanageContents) {
       if ($(this.currentCont)) {
         currentTop = $(this.currentCont).offset().top;
         currentBottom = currentTop + $(this.currentCont).height();
         if (scrlTop >= currentBottom) {
           if (this.scrlTopOld < scrlTop) {
             this._changeContents(this.currentNum + 1, true);
           }
         }
         beforeNum = beforeNum < 0 ? 0 : this.currentNum - 1;
         beforeContentsH = $(this.areaList[beforeNum]).height();
         marginH = 0;
         if (this.isUseBeforeChange) {
           marginH = beforeContentsH;
         }
         if (scrlTop < currentTop - marginH) {
           if (this.scrlTopOld > scrlTop) {
             this._changeContents(this.currentNum - 1, false);
           }
         }
       }
     }
     if (this.isUseAreaUpdate) {
       winH = $(window).innerHeight();
       nowY = winH + scrlTop;
       ref = this.areaList;
       for (i = j = 0, len = ref.length; j < len; i = ++j) {
         _area = ref[i];
         areaParcent = 0;
         areaScrTop = $(this.areaList[i]).offset().top;

         areaH = $(this.areaList[i]).height();
         if (areaScrTop < nowY && nowY < areaScrTop + areaH + winH) {
           areaParcent = (nowY - areaScrTop) / (areaH + winH) * 100;
           this.evt.emit("AREA_UPDATE", {
             tag: this.areaList[i],
             per: areaParcent,
             id: i
           });
         } else if (areaScrTop + areaH + winH < nowY) {
           areaParcent = 100;
         }
       }
     }
     if (this.isUseTargetUpdate) {
       this._checkTargetIn();
     }
     this.scrlTopOld = scrlTop;
   }

   //各要素がフェードインしたかどうか#追加151007
   _checkTargetIn() {
     this.targetCLS.each((index, element) => {

       let elemPos, scroll, winH;
       elemPos = $(element).offset().top;
       scroll = $(window).scrollTop();
       winH = $(window).innerHeight();
      //  console.log(this.targetInMargin,scroll,elemPos);
       if (scroll > elemPos - winH + this.targetInMargin) {
         if (!$(element).data("isIn")) {
          //  console.log("///",element);
           $(element).data("isIn", true);
           this.evt.emit("TARGET_IN", {
             target: $(element)
           });
         }
       }
       if (scroll < elemPos - winH) {
         if (this.isUseTargetInOnce) {
           return;
         }
         if ($(element).data("isIn")) {
           $(element).data("isIn", false);
           this.evt.emit("TARGET_OUT", {
             target: $(element),
             param: "before"
           });
         }
       }
       //コンテンツ表示外
       if (this.isUseAfterOut) {
         if (scroll > elemPos + $(element).outerHeight() + this.targetOutMargin) {
           if (this.isUseTargetInOnce) {
             return;
           }
           if (!$(element).data("isOut")) {
             $(element).data("isOut", true);
             this.evt.emit("TARGET_OUT", {
               target: $(element),
               param: "after"
             });
           }
         } else {
           $(element).data("isOut", false);
         }
       }
     });
   }

   getScrlMove() {
     return this.isScrlMove;
   }
   setScrlMove(b) {
     this.isScrlMove = b;
   }


 }
