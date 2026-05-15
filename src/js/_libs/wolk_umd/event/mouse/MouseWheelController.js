
/*
	via https://w3g.jp/blog/wheelevent_crossbrowser

  function move(e) {
    console.log("move",e.delta,e.dir);
  }
	$ ->
    MWheelController.getInstance().init()
    MWheelController.getInstance().event.addListener("MOVE",move)
 */

import EventEmitter from "../EventEmitter";

let PrivateClass, instance;

export default class MWheelController {
  static getInstance() {
    return instance != null ? instance : instance = new PrivateClass;
  }
}

instance = null;

PrivateClass = ((() => {
  let _isLock, _save, _this, onWheel;

  _this = null;
  _save = 0;
  _isLock = false;


  class PrivateClass {

    event = null;
    maxClock = 100;
    maxDelta = 500;

    constructor() {
      _this = this;
    }

    initJq() {
      let mousewheelevent;
      this.event = new EventEmitter();
      mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
      return $(document).on(mousewheelevent, e => {
        let clock, delta;
        clock = e.timeStamp - _save;
        _save = e.timeStamp;
        if (clock < _this.maxClock) {
          return false;
        }
        delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
        if (_this.maxDelta < Math.abs(delta)) {
          return false;
        }
        if (delta < 0) {
          _this.event.emit("MOVE", {
            delta: delta,
            dir: -1
          });
        } else if (delta > 0) {
          _this.event.emit("MOVE", {
            delta: delta,
            dir: 1
          });
        }
      });
    }

    init() {
      let e, mousewheelevent;
      this.event = new EventEmitter();
      mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
      try {
        document.addEventListener(mousewheelevent, onWheel, false);
      } catch (error) {
        e = error;
        document.attachEvent('onmousewheel', onWheel);
      }
    }

    lock(flg) {
      return _isLock = flg;
    }
  }

  onWheel = e => {
    let clock, delta;
    if (_isLock) {
      return;
    }
    if (!e) {
      e = window.event;
    }
    clock = e.timeStamp - _save;
    _save = e.timeStamp;
    if (clock < _this.maxClock) {
      return false;
    }

    delta = e.deltaY ? -(e.deltaY) : e.wheelDelta ? e.wheelDelta : -(e.detail);
    console.log(delta,_isLock);
    if (_this.maxDelta < Math.abs(delta)) {
      return false;
    }
    if (delta < 0) {
      _this.event.emit("MOVE", {
        delta: delta,
        dir: -1
      });
    } else if (delta > 0) {
      _this.event.emit("MOVE", {
        delta: delta,
        dir: 1
      });
    }
  };

  return PrivateClass;
}))();
