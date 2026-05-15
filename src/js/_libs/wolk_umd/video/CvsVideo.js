
/*
  #主にiOSでvideoタグの代わりにcanvasで動画を再生
  シンプルなベース開発時のもの(ライブラリ未使用版)
  音声のvolumeを調整する場合はsound.jsを使用したCJCvsVideoを使う
 */
export default class CvsVideo {

    _video = null;
    _canvas = null;
    _canvasContext = null;
    _startTime = 0;
    _duration = 0;
    _audio = null;
    _raf = null;
    _wid = 640;
    _hei = 360;
    _isFirstPlay = true;
    _isPause = false;
    _pauseTime = 0;
    _updateFunc = null;

    constructor() {
      this.onError = this.onError.bind(this);
      this.onLoad = this.onLoad.bind(this);
    }

    init(canvasSl, videoSl, isSyncAudio = true) {
      this._canvas = $(canvasSl).get(0);
      this._canvasContext = this._canvas.getContext("2d");
      this._video = $(videoSl).get(0);
      this._video.addEventListener("error", this.onError);
      this._video.addEventListener("loadeddata", this.onLoad);
      this._audio = new Audio();
      this._updateFunc = isSyncAudio ? this.updateSynchAudio : this.updateVideoMode;
    }

    setToggleBtn(target,playFunc=null,pauseFunc=null) {
      let _this = this;
      // $(target).on("click", function(e) {
      $(target).on("touchstart", function(e) {
        if (_this._isFirstPlay) {
          _this._isFirstPlay = false;
          _this.videoStart();
          if (playFunc) {
            playFunc();
          }
        } else {
          if (_this._isPause) {
            _this.play();
            if (playFunc) {
              playFunc();
            }
          } else {
            // console.log("pauseFunc",_this);
            _this.pause();
            if (pauseFunc) {
              pauseFunc();
            }
          }
        }
      });
    }

    destroy() {
      cancelAnimationFrame(this._raf);
      this._canvasContext.clearRect(0, 0, this._wid, this._hei);
      this._video.removeEventListener("error", this.onError);
      this._video.removeEventListener("loadeddata", this.onLoad);
    }

    load(wid, hei, videoSrc, audioSrc="") {
      this._wid = wid;
      this._hei = hei;
      this._video.src = videoSrc;
      if (audioSrc === "") {
        this._audio.src = $(this._video).attr("src");
      } else {
        this._audio.src = audioSrc;
      }
      this._video.load();
    }

    getCanvas() {
      return this._canvas;
    }
    getVideo() {
      return this._video;
    }

    pause () {
      this._isPause = true;
      this._audio.pause();
    }
    play() {
      this._pauseTime = new Date().getTime();
      this._isPause = false;
      this._audio.play();
      this.update();
    }

    setVolume(param) {
      this._audio.volume = param;
    }

    onError = () => {};

    onLoad = () => this.videoDraw();

    videoStart = () => {
      // console.log("Cvs videoStart",this);
      this._pauseTime = 0;
      this._video.currentTime = 0;
      this._audio.currentTime = 0;
      this._startTime = new Date().getTime();
      this._duration = this._video.duration;
      this._audio.play();
      this.update();
    };

    videoDraw = () => {
      // console.log("videoDraw",this._video);
      this._canvasContext.drawImage(this._video, 0, 0, this._wid, this._hei);
    }

    update = () => {
      if (this._isPause) {
        return;
      }
      this._updateFunc();
      this.videoDraw();
      if (!this._audio.paused) {
        this._raf = requestAnimationFrame(this.update);
      }
    };

    updateVideoMode = () => {
      let currentTime, time;
      currentTime = new Date().getTime();
      time = (currentTime - this._startTime - this._pauseTime) / 1000;
      this._video.currentTime = time;
    };
    updateSynchAudio = () => {
      // console.log(this._audio.currentTime);
      this._video.currentTime = this._audio.currentTime;
    }

  }
