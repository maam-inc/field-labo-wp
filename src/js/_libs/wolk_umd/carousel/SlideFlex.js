  //html//
  /*
  <ul id="productSlide">
      <li><img src="assets/images/proto/s1.jpg" alt=""></li>
      <li><img src="assets/images/proto/s2.jpg" alt=""></li>
      <li><img src="assets/images/proto/s3.jpg" alt=""></li>
      <li><img src="assets/images/proto/s4.jpg" alt=""></li>
      <li><img src="assets/images/proto/s5.jpg" alt=""></li>
  </ul>

  <ul id="productUi">
      <li class="next"><img src="assets/images/proto/right_btn_s.png"/></li>
      <li class="prev"><img src="assets/images/proto/left_btn_s.png"/></li>
  </ul>
  */

  //sass//
  /*
  #productSlide
  position: relative
  li
    position: absolute

  #productUi
    position: absolute
    width: 700px
    left: 50%
    margin-left: -350px

    .next
      position: absolute
      right: 0
    .prev
      position: absolute
      left: 0
  */

  //js//
  /*
  let ss = new SlideFlex()
  let marginLeft = 90
  // let marginList = [0-marginLeft,300-marginLeft,600-marginLeft,900-marginLeft,1200-marginLeft]
  let marginList = [320]
  ss.setCenterCount(2)//中心を設定する場合
  // ss.setActiveList([1,2,3])//表示する配列を設定
  // ss.setEndAlpOff()//両端のフェードアウトをoff
  // ss.setUseCustomMotion()//カスタムモーション設定
  ss.setLockTime(1)//UIロック時間設定
  ss.setNextPrevUi(".next",".prev")//ページングui
  ss.init("#productSlide",marginList,100)//初期設定
  ss.setLoopMotion(4,true)//ループアニメーション設定
  */

export default class SlideFlex {
    _this = null;
    slideList = null;
    activeSlideList = [];
    isShowAll = true;
    isUseCustomMotion = false;
    maxCount = null;
    moveTime = 1;
    moveEase = 1;
    endMove = 100;
    timer = null;
    activeCount = -1;
    loopFunc = null;
    isLockMotion = false;
    isLockTime = 0;
    loopTime = 3;

    loopEndAlp = 0;
    loopEndPower = 3;
    loopEndMovePower = 2;

    constructor() {
      // _this = this;
    }
    init(slideImgTag,initPosAry,endMove=100,moveTime=1,moveEase=Quint.easeOut){
      this.moveTime = moveTime;
      this.moveEase = moveEase;
      this.slideList = [];

      $(slideImgTag + ' li').each((i,elm) => {
        
        let xPos;
        if(initPosAry.length === 1){
          xPos = i*initPosAry[0];
          this.endMove = initPosAry[0];

        }else{
          xPos = initPosAry[i];
          this.endMove = endMove;
        }

        elm.initX = xPos;
        elm.id = Number(i);
        this.slideList.push({target:elm, currentId:i, xPos:xPos});
        TweenLite.set(elm, {x:xPos});

        this.maxCount = this.slideList.length-1;
        this.loopFunc = this.loop;
      });
    }

    //////
    //以下public設定
    //////

    //真ん中、アクティブな配列index(任意)
    setCenterCount(centerIndex){
      this.centerCount = centerIndex;
    }
    //表示する配列(任意)
    setActiveList(activeSlideList){
      this.isShowAll = false;
      this.activeSlideList = activeSlideList;
    }
    
    //スライド以外の拡大などカスタムモーション時(任意)
    setUseCustomMotion(){
      this.isUseCustomMotion = true;
    }
    //制御時間設定(任意)
    setLockTime(time){
      this.isLockTime = time;
    }
    //両端のalphaフェードなし(任意)
    setEndAlpOff(){
      this.loopEndPower = 1;
      this.loopEndMovePower = 1;
      this.loopEndAlp = 1;
    }

    //ループモーション設定(任意)
    setLoopMotion(time,isFirstMove=true){
      this.loopTime = time;
      if(isFirstMove){
        this.loopFunc();
      }
      this.startAutoLoop();
    }

    //ページングボタン設定(任意)
    setNextPrevUi(nextTag, prevTag) {
      $(nextTag).on('click',()=> {
        if(this.isLockMotion){
          return;
        }
        this.stopAutoLoop();
        this.startAutoLoop();
        this.moveMotion(1);
      });
      
      $(prevTag).on('click', ()=> {
        if(this.isLockMotion){
          return;
        }
        this.stopAutoLoop();
        this.startAutoLoop();
        this.moveMotion(-1);
      });
    }
    //////
    //////

    lockMotion(){
      this.isLockMotion = true;
      TweenMax.delayedCall(this.isLockTime, () => {
        this.isLockMotion = false;
      });
    }

    startAutoLoop(){
      TweenMax.killDelayedCallsTo(this.loopFunc);
      TweenMax.delayedCall(this.loopTime, this.loopFunc);
    }

    stopAutoLoop(){
      TweenMax.killDelayedCallsTo(this.loopFunc);
    }

    loop = () =>{
      this.moveMotion(1);
      this.loopFunc = this.loop;
      TweenMax.delayedCall(this.loopTime, this.loopFunc);
    }

    moveMotion(dir){
      this.lockMotion();
      let endNum,endId,activeOutNum,activeInNum;
      if(dir === 1){
        endNum = 0;
        endId = this.maxCount;
        activeOutNum = this.activeSlideList[0];
        activeInNum = this.activeSlideList[this.activeSlideList.length];
      }else{
        endNum = this.maxCount;
        endId = 0;
        activeOutNum = this.activeSlideList[this.activeSlideList.length-1];
        activeInNum = this.activeSlideList[this.activeSlideList.length];
      }
      let i=0;
      let nextPos;
      while(i <= this.maxCount){
        let list = this.slideList[i];

        //ターゲット
        let img = $(list.target).find("img");
        //その他のターゲット
        // txt = $(list.target).find(".p-txt")

        let currentId = list.currentId;
        let moveTime = this.moveTime;

        TweenMax.killTweensOf(list.target);

        if(list.currentId === endNum){
          //両端の時
          nextPos = this.slideList[list.currentId].xPos-this.endMove*dir;
          list.currentId = endId;

          //以下アニメーション設定（デフォルト）
          TweenLite.to(list.target, moveTime, {x:nextPos, ease:this.moveEase});
          TweenLite.to(list.target, moveTime/this.loopEndPower, {alpha:this.loopEndAlp, ease:Linear.easeNone});
          
          TweenLite.to(list.target, 0, {x:this.slideList[list.currentId].xPos+this.endMove/1*dir, ease:this.moveEase,delay:moveTime/this.loopEndPower});
          TweenLite.to(list.target, moveTime*this.loopEndMovePower/this.loopEndPower, {x:this.slideList[list.currentId].xPos, ease:this.moveEase,delay:moveTime/this.loopEndPower});
          if(this.checkActiveCount(list.currentId)){
            //表示対象の時
            TweenLite.to(list.target, moveTime*this.loopEndMovePower/this.loopEndPower, {alpha:1, ease:this.moveEase,delay:moveTime/this.loopEndPower});
          }

          //（可変）
          this.customHideMotion(list,moveTime);
          // TweenLite.to(img, moveTime, {scale:0.72, ease:this.moveEase})
          // TweenLite.to(txt, moveTime, {alpha:0, ease:this.moveEase})
        }else{

          list.currentId += -1*dir;
          nextPos = this.slideList[list.currentId].xPos;

          if(list.currentId === this.centerCount){
            //アクティブな配列の時(デフォルト-1の時はなし)
            this.centerIndexMotion(list,nextPos,moveTime);
            this.customCenterIndexMotion(list,moveTime);
          }else{
            //両はしでもアクティブでもない時
            //以下アニメーション設定（デフォルト）
            TweenLite.to(list.target, moveTime, {x:nextPos,alpha:1, ease:this.moveEase});
            //（可変）
            // TweenLite.to(img, moveTime, {scale:0.72, ease:this.moveEase})
            // TweenLite.to(txt, moveTime, {alpha:0, ease:this.moveEase})
            this.customHideMotion(list,moveTime);
          }
        }

        //表示オブジェクト制限時
        if(!this.isShowAll){
          if(this.checkActiveCount(list.currentId)){
            TweenLite.set(list.target,{display:"block"});
            //表示する(アクティブ時)
            if(activeInNum === currentId){
              //アクティブ時のイン(端)
              TweenLite.set(list.target,{alpha:this.loopEndAlp});
              TweenLite.to(list.target, moveTime, {alpha:1, ease:this.moveEase});
            }
            
          }else{
            if(activeOutNum === currentId){
              //アクティブ時のアウト(端)
              // TweenLite.to(list.target, this.moveTime, {x:nextPos, ease:this.moveEase})
              TweenLite.to(list.target, moveTime/this.loopEndPower, {alpha:this.loopEndAlp,display:"none", ease:Linear.easeNone});
            }else{
              TweenLite.set(list.target,{alpha:this.loopEndAlp,display:"none"});
            }
          }
        }

        i++;
      }
    }

    //中央表示のモーション(任意)
    centerIndexMotion(list,nextPos,moveTime){
      let img = $(list.target).find("img");
      // txt = $(list.target).find(".p-txt")
      //以下アニメーション設定（可変）
      TweenLite.to(list.target, moveTime, {x:nextPos,alpha:1, ease:this.moveEase});
      // TweenLite.to(img, moveTime, {scale:1, ease:this.moveEase})
      
    }

    customCenterIndexMotion (list, moveTime){
      if(!this.isUseCustomMotion){
        return;
      }
      //可変可
      /*
      //ここに設定
      */
    }

    customHideMotion(list, moveTime){
      if(!this.isUseCustomMotion){
        return;
      }
      //可変可
      /*
      //ここに設定
      */
    }
    //////
    checkMoveTime (id){
      let time = 0;
      if(this.checkActiveCount(id)){
        time = this.moveTime;
      }
      return time;
    }
    //////

    checkActiveCount (id){
      if(this.activeSlideList.length === 0){
        return true;
      }else{
        for (let list of this.activeSlideList){
          if(list === id){
            
            return true;
            break;
          }
        }
      }
    }
    
}
