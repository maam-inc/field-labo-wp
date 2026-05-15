
/*
#Sample#
let pageNum = 0;
let maxpage = 2;
let _isLock = false;
function flickStart(startY){
  console.log("flickStart",startY)
}
function flickMove(dy){
  console.log("flickMove",dy)
  TweenMax.killTweensOf("#contents1")
  TweenMax.to("#contents1", 0.3, {y:$(window).height()*pageNum-dy, ease:Cubic.easeOut})
}
function flickEnd(dir,posName){
  console.log("flickEnd",dir,posName,pageNum)
  if(_isLock)
    return
  this.pageNum += dir
  if(pageNum>0)
    pageNum=0
  if(pageNum<-maxpage)
    pageNum = -maxpage
  TweenMax.killTweensOf("#contents1")
  TweenMax.to("#contents1", 0.6, {y:$(window).height()*pageNum, ease:Cubic.easeOut,delay:0,onComplete:moveEnd})
  _isLock = true
}
function moveEnd(){
  _isLock = false
}
 */


export default class FlickEvent {
  _isTouch = false;
  _START = null;
  _MOVE = null;
  _END = null;
  _onFlickFunc = null;
  _flickParam = 10;
  _startCbFunc = null;
  _moveCbFunc = null;
  _endCbFunc = null;
  _touchStartX = 0;
  _touchStartY = 0;
  _touchMoveX = 0;
  _touchMoveY = 0;
  _isToutchDown = false;
  _isToutchUp = true;

  constructor(dirFuncParam = "xy") {
    this._isTouch = window.ontouchstart === null;
    this._START = this._isTouch ? 'touchstart' : 'mousedown';
    this._MOVE = this._isTouch ? 'touchmove' : 'mousemove';
    this._END = this._isTouch ? 'touchend' : 'mouseup';
    if (dirFuncParam === "x") {
      this._onFlickFunc = this.onFlickX;
    } else if (dirFuncParam === "y") {
      this._onFlickFunc = this.onFlickY;
    } else {
      this._onFlickFunc = this.onFlickXY;
    }
  }

  getIsTouch() {
    return this._isTouch;
  }

  addFlickEvent($target, flickParam, endCbFunc, startCbFunc= null, moveCbFunc= null) {
    this._flickParam = flickParam;
    this._startCbFunc = startCbFunc;
    this._moveCbFunc = moveCbFunc;
    this._endCbFunc = endCbFunc;
    $target.off(this._START, this._onFlickFunc).off(this._MOVE, this._onFlickFunc).off(this._END, this._onFlickFunc);
    $target.on(this._START, this._onFlickFunc).on(this._MOVE, this._onFlickFunc).on(this._END, this._onFlickFunc);
  }

  removeFlickEvent($target) {
    $target.off(this._START, this._onFlickFunc).off(this._MOVE, this._onFlickFunc).off(this._END, this._onFlickFunc);
  }


  onFlickXY = event => {
    let dx, dy;
    switch (event.type) {
      case this._START:
        event.preventDefault();
        this._isToutchDown = true;
        this._isToutchUp = false;
        this._touchStartX = this._isTouch ? event.originalEvent.touches[0].clientX : event.clientX;
        this._touchStartY = this._isTouch ? event.originalEvent.touches[0].clientY : event.clientY;
        this._touchMoveX = this._touchStartX;
        this._touchMoveY = this._touchStartY;
        if (this._startCbFunc) {
          this._startCbFunc(this._touchStartX, this._touchStartY);
        }
        break;
      case this._MOVE:
      //#ドラッグ中の操作
        event.preventDefault();
        if (!this._isToutchDown) {
          if (!this._isToutchUp) {
            this._moveCbFunc(0, 0);
          }
          return;
        }
        this._touchMoveX = (this._isTouch ? event.originalEvent.touches[0].clientX : event.clientX);
        this._touchMoveY = (this._isTouch ? event.originalEvent.touches[0].clientY : event.clientY);
        dx = parseFloat(this._touchStartX - this._touchMoveX);
        dy = parseFloat(this._touchStartY - this._touchMoveY);
        if (this._moveCbFunc) {
          this._moveCbFunc(dx, dy);
        }
        break;
      case this._END:
        if (!this._isToutchDown) {//#PCのマウスムーブ時対策
          return;
        }
        this._isToutchDown = false;
        this._isToutchUp = true;
        if (this._touchStartX > this._touchMoveX) {
          if (this._touchStartX > this._touchMoveX + this._flickParam) {
            //#右から左に指が移動した場合
            this._endCbFunc(-1, "x");
          } else {
            //#キャンセル(_flickParam以下の場合)
            this._endCbFunc(0, "x");
          }
        } else if (this._touchStartX < this._touchMoveX) {
          if (this._touchStartX + this._flickParam < this._touchMoveX) {
            //#左から右に指が移動した場合
            this._endCbFunc(1, "x");
          } else {
            //#キャンセル(_flickParam以下の場合)
            this._endCbFunc(0, "x");
          }
        }
        if (this._touchStartY > this._touchMoveY) {
          if (this._touchStartY > this._touchMoveY + this._flickParam) {
            //#下から上に指が移動した場合
            this._endCbFunc(-1, "y");
          } else {
            //#キャンセル(_flickParam以下の場合)
            this._endCbFunc(0, "y");
          }
        } else if (this._touchStartY < this._touchMoveY) {
          if (this._touchStartY + this._flickParam < this._touchMoveY) {
            //#上から下に指が移動した場合
            this._endCbFunc(1, "y");
          } else {
            //#キャンセル(_flickParam以下の場合)
            this._endCbFunc(0, "y");
          }
        }
    }
  }

  onFlickX = event => {
    let dx;
    switch (event.type) {
      case this._START:
        event.preventDefault();
        this._isToutchDown = true;
        this._isToutchUp = false;
        this._touchStartX = this._isTouch ? event.originalEvent.touches[0].clientX : event.clientX;
        this._touchMoveX = this._touchStartX;
        if (this._startCbFunc) {
          this._startCbFunc(this._touchStartX);
        }
        break;
      case this._MOVE:
        event.preventDefault();
        if (!this._isToutchDown) {
          if (!this._isToutchUp) {
            this._moveCbFunc(0, 0);
          }
          return;
        }
        this._touchMoveX = (this._isTouch ? event.originalEvent.touches[0].clientX : event.clientX);
        dx = parseFloat(this._touchStartX - this._touchMoveX);
        if (this._moveCbFunc) {
          this._moveCbFunc(dx);
        }
        break;
      case this._END:
        if (!this._isToutchDown) {
          return;
        }
        this._isToutchDown = false;
        this._isToutchUp = true;
        if (this._touchStartX > this._touchMoveX) {
          if (this._touchStartX > this._touchMoveX + this._flickParam) {
            this._endCbFunc(-1, "x");
          } else {
            this._endCbFunc(0, "x");
          }
        } else if (this._touchStartX < this._touchMoveX) {
          if (this._touchStartX + this._flickParam < this._touchMoveX) {
            this._endCbFunc(1, "x");
          } else {
            this._endCbFunc(0, "x");
          }
        }
    }
  }

  onFlickY = event => {
    let dy;
    switch (event.type) {
      case this._START:
        event.preventDefault();
        this._isToutchDown = true;
        this._isToutchUp = false;
        this._touchStartY = this._isTouch ? event.originalEvent.touches[0].clientY : event.clientY;
        this._touchMoveY = this._touchStartY;
        if (this._startCbFunc) {
          this._startCbFunc(this._touchStartY);
        }
        break;
      case this._MOVE:
        event.preventDefault();
        if (!this._isToutchDown) {
          if (!this._isToutchUp) {
            this._moveCbFunc(0);
          }
          return;
        }
        this._touchMoveY = (this._isTouch ? event.originalEvent.touches[0].clientY : event.clientY);
        dy = parseFloat(this._touchStartY - this._touchMoveY);
        if (this._moveCbFunc) {
          this._moveCbFunc(dy);
        }
        break;
      case this._END:
        if (!this._isToutchDown) {
          return;
        }
        this._isToutchDown = false;
        this._isToutchUp = true;
        if (this._touchStartY > this._touchMoveY) {
          if (this._touchStartY > this._touchMoveY + this._flickParam) {
            this._endCbFunc(-1, "y");
          } else {
            this._endCbFunc(0, "y");
          }
        } else if (this._touchStartY < this._touchMoveY) {
          if (this._touchStartY + this._flickParam < this._touchMoveY) {
            this._endCbFunc(1, "y");
          } else {
            this._endCbFunc(0, "y");
          }
        }
      }
    }
}
