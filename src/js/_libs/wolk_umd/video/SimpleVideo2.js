// const bind = (fn, me) => function(){ return fn.apply(me, arguments); };


export default class SimpleVideo2 {

  _video = null;
  _isPause = true;
  _isLoopVideo = false;
  _videoLoadedFunc = null;
  _videoStartFunc = null;
  _this = null;
  _playFunc = null;
  _pauseFunc = null;
  _isAutoPlay = true;
  _isAutoPlayPause = true;
  _volume = 1;
  _isOnStart = false;
  _isMuteMode = false;
  _this = null;

  constructor() {
    //es5
    this.onComplete = this.onComplete.bind(this);
    this.onStartPause = this.onStartPause.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  init(videoSl, isLoopVideo = false) {
    this._this = this;
    this._isLoopVideo = isLoopVideo;
    this._video = $(videoSl).get(0);
    // console.log("this._video",this._video);
    if (this._isLoopVideo) {
      this._video.loop = true;
    }
    this._video.addEventListener("loadeddata",this.onLoad);
    this._video.addEventListener("timeupdate", this.onStart);
    this._video.addEventListener("ended", this.onComplete);
  }

  destroy() {
    this._video.removeEventListener("loadeddata", this.onLoad);
    this._video.removeEventListener("timeupdate", this.onStart);
    this._video.removeEventListener("ended", this.onComplete);
  }

  load(videoSrc,videoLoadedFunc=null,videoStartFunc=null,isAutoPlay=true,isAutoPlayPause=false,isLoadMute=false){
    // console.log("Simple load");
    this._video.src = videoSrc;
    this._videoLoadedFunc = videoLoadedFunc;
    this._videoStartFunc = videoStartFunc;
    this._isAutoPlay = isAutoPlay;
    this._isAutoPlayPause = isAutoPlayPause;
    if (this._isAutoPlayPause) {
      if (isLoadMute) {
        this._video.volume = 0;
      }
      this._video.addEventListener("timeupdate", this.onStartPause);
    }
    this._isOnStart = false;
    this._video.load();
  }

  onLoad(e) {
    if (this._isAutoPlay) {
      this._isPause = false;
      this._video.play();
    }
    if (this._videoLoadedFunc) {
      this._videoLoadedFunc();
    }
  }

  onStart (e) {
    this._isOnStart = true;
    this._video.removeEventListener("timeupdate", this.onStart);
    if (this._videoStartFunc) {
      this._videoStartFunc();
    }
  }
  onStartPause(e) {
    this._video.removeEventListener("timeupdate", this.onStartPause);
    this._isOnStart = true;
    if (this._isAutoPlayPause) {
      this._isPause = true;
      this._video.pause();
      this._video.volume = this._volume;
    }
  }
  onComplete(e) {
    if (!this._isLoopVideo) {
      return this.pause();
    }
  }

  getVideo() {
    return this._video;
  }

  stop() {
    this._isPause = true;
    return this._video.pause();
  }
  seek(pos) {
    if (pos == null) {
      pos = 0;
    }
    rthis._video.currentTime = pos;
  }
  pause() {
    this._isPause = true;
    this._video.pause();
    if (this._pauseFunc) {
      this._pauseFunc();
    }
  }
  play() {
    this._isPause = false;
    this._video.play();
    if (this._playFunc) {
      this._playFunc();
    }
  }
  setVolume(param) {
    if (param === 0) {
      this._isMuteMode = true;
    } else {
      this._isMuteMode = false;
    }
    this._volume = param;
    this._video.volume = param;
  }

  setToggleBtn(target,playFunc=null,pauseFunc=null) {
    this._playFunc = playFunc;
    this._pauseFunc = pauseFunc;
    let _this = this;
    $(target).on("click", function(e) {
      if (!_this._isOnStart) {
        return;
      }
      if (_this._isPause) {
        _this.play();
      } else {
        _this.pause();
      }
    });
  }

  touchPlayBtn() {
    this.play();
  }
}




  /*
  setFocusBlur: ->
    $(window).on('focus', =>
      if(!@_isMuteMode)
        if(@_video)
          @_video.volume = 1
    ).on 'blur', =>
      if(@_video)
        @_video.volume = 0
   */

//   return SimpleVideo2;
// }))();
