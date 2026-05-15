
//update es6バージョン 170602//
//

import EventEmitter from "../event/EventEmitter";

/*
グローバルAPIコールバック関数
 */
/*
# YoutubeのJSファイルがロードされ実行されると、
# onYouTubeIframeAPIReadyメソッドが呼ばれるので、
# 再生準備を行います。
*/
function onYouTubeIframeAPIReady() {
  console.log("onYouTubeIframeAPIReady");
  YoutubeEvent.isApiReady = true;
  YoutubeEvent.evt.emit("API_READY");
};
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

// window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

//# 再生が可能になると呼び出されます。
function onPlayerReady(event) {
  // console.log("onPlayerReady:::",event,event.target,event.target.evt);
  event.target.evt.emit("PLAYER_READY", {target: event.target});
};
window.onPlayerReady = onPlayerReady;


function onPlayerStateChange(event){
  event.target.evt.emit("PLAYER_CHANGE", {target: event.target});
  // console.log("onPlayerStateChange", event.data);
  if (event.data === YT.PlayerState.ENDED) {
    event.target.evt.emit("PLAYER_END", {
      target: event.target
    });
  }
  if (event.data === YT.PlayerState.PLAYING) {
    event.target.evt.emit("PLAYER_START", {
      target: event.target
    });
  }
};
window.onPlayerStateChange = onPlayerStateChange;

//埋め込みタグ呼び出し(1回のみ)
class YoutubeEnbed{
  static isEmbed = "";
  _isEmbed = false;

  static load(){

    YoutubeEnbed.isEmbed = false;
    if(!this._isEmbed){
      this._isEmbed = true;
      YoutubeEnbed.isEmbed = true;
      //YoutubeのJSファイルをロードします。
      // console.log("YoutubeEnbed");
      let tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      let firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }
}



//dispatch用イベント
class YoutubeEvent{
  static isApiReady = false;
  static evt = new EventEmitter()
}

export default class YoutubePlayer{
  player = null;
  isPlayerReady = false;

  _this = null;
  _volume = 70;


  constructor(tag, videoId="", wid="100%", hei="100%", isLoop=false, isMute=false, isAutoplay=1, isControls=1, isAutohide=1, quality="hd720") {
    this.tag = tag;
    this.videoId = videoId;
    this.wid = wid;
    this.hei = hei;
    this.isLoop = isLoop;
    this.isMute = isMute;
    this.isAutoplay = isAutoplay;
    this.isControls = isControls;
    this.isAutohide = isAutohide;
    this.quality = quality;

    this.loopVideo = this.loopVideo.bind(this);
    this.playerReady = this.playerReady.bind(this);
    this.setPlayer = this.setPlayer.bind(this);
    this._this = this;

    this.evt = new EventEmitter();

    this.evt.addListener("PLAYER_READY", this.playerReady);
    if (this.isLoop) {
      this.evt.addListener("PLAYER_END", this.loopVideo);
    }
    if (YoutubeEnbed.isEmbed) {
      //初回のhtmlにyoutubeEnbedされてたら
      if(YoutubeEvent.isApiReady){
        //youtubeコード埋め込み完了時
        this.setPlayer();
      }else{
        YoutubeEvent.evt.addListener("API_READY", this.setPlayer);
      }
    } else {
      //初回時
      // console.log("初回時");
      YoutubeEvent.evt.addListener("API_READY", this.setPlayer);
      YoutubeEnbed.load();
    }

  }


  setPlayer(e) {
    YoutubeEvent.evt.removeListener("API_READY", this.setPlayer);
    this.player = new YT.Player(this.tag, {
      height: this.hei,
      width: this.wid,
      videoId: this.videoId,
      events: {
        onReady: window.onPlayerReady,
        onStateChange: onPlayerStateChange
      },
      playerVars: {
        //"theme": "dark",
        //"hd": 1,
        //"fs": 1,
        //"color": "white",
        //"wmode": "opaque",
        "modestbranding": 1,
        "showinfo": 0,
        'rel': 0,
        'autoplay': this.isAutoplay,
        'loop': 0,
        'controls': this.isControls,
        'html5': 1,
        'autohide': this.isAutohide
      }
    });

    this.player.evt = this.evt;
  }

  playerReady(e) {
    this.isPlayerReady = true;
    let　target = e.target;
    if (target === this.player) {
      this.evt.removeListener("PLAYER_READY", this.playerReady);
      if (this.isMute) {
        this.player.mute();
      } else {
        this.player.setVolume(this._volume);
      }
    }
  }

  loopVideo(e) {
    let target = e.target;
    if (target === this.player) {
      this.player.playVideo();
    }
  }

  loadVideoId(videoId) {
    if (this.player && this.isPlayerReady) {
      this.player.loadVideoById(videoId, 0, this.quality);
    }
  }

  cueVideoId(videoId) {
    if (this.player && this.isPlayerReady) {
      this.player.cueVideoById({
        'videoId': videoId,
        'suggestedQuality': this.quality
      });
    }
  }

  stopVideo() {
    if (this.player && this.isPlayerReady) {
      this.player.stopVideo();
    }
  }

  pauseVideo() {
    if (this.player && this.isPlayerReady) {
      this.player.pauseVideo();
    }
  }

  resumeVideo() {
    if (this.player && this.isPlayerReady) {
      this.player.playVideo();
    }
  }

  setQuality(quality) {
    this.quality = quality;
  }

  setVolume(volume) {
    this._volume = volume;
  }

  changeVolume(volume) {
    if (this.player && this.isPlayerReady) {
      this._volume = volume;
      this.player.setVolume(volume);
    }
  }

  clearVideo() {
    if (this.player) {
      this.player.stopVideo();
      this.player.clearVideo();
    }
  }

  destroyVideo() {
    if (this.player) {
      try {
        this.player.stopVideo();
        this.player.destroy();
        this.player = null;
        this.evt.removeListener("PLAYER_READY", this.playerReady);
        this.evt.removeListener("PLAYER_END", this.loopVideo);
        this.evt = null;
        this.isPlayerReady = false;
        this._this = null;
      } catch (error) {
        console.log("ERROR!!");
      }
    }
  }

}
