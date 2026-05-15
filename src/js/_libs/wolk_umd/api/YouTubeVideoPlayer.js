// for USE
/*
const videoOptions = [
  {
      videoId: 'POGJXpqXItM',
      divId: 'yt1',
      autoplay: 1,
      backgroundMode: true, // Play video in the background
      showControls: false, // Hide player controls
  },
  {
      videoId: 'ZGXZcD3omwo',
      divId: 'yt2',
      autoplay: 1,
      backgroundMode: false,
  },
];

let ytp = new YouTubeVideoPlayer(videoOptions);
*/

export default class YouTubeVideoPlayer {

  seekTimeBeforeEnd = 1;//ループ時にseek=0(先頭に戻す)バッファ時間

  constructor(options) {
    this.videoOptions = options.map((videoInfo) => (
      {
        videoId: videoInfo.videoId,
        divId: videoInfo.divId,
        width: videoInfo.width || "auto",
        height: videoInfo.height || "auto",
        loop: videoInfo.loop || 0,
        showControls: videoInfo.showControls || 0,
        autoplay: videoInfo.autoplay || 0,
        autoStart: videoInfo.autoStart || false,
        isMute: videoInfo.isMute || true,
        backgroundMode: videoInfo.backgroundMode || false,
        callBackFunc: videoInfo.callBackFunc || null,
    }));

    // console.log(this.videoOptions)

    this.players = [];
    this.playersInfo = [];
    this.currentPlayer = null;
    // this.seekTimeBeforeEnd = 1;

    this.loadYouTubeAPI();
  }

  loadYouTubeAPI() {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Define the callback function for when the API is ready
      window.onYouTubeIframeAPIReady = () => {
        this.createVideoPlayers();
      };
    } else {
      // If the YouTube API script is already loaded, create video players directly
      this.createVideoPlayers();
    }
  }

  createVideoPlayers() {
    this.videoOptions.forEach((videoInfo) => {
      // console.log("showControls:::",videoInfo.showControls)
      const player = new YT.Player(videoInfo.divId, {
          height: videoInfo.height || 'auto',
          width: videoInfo.width || 'auto',
          videoId: videoInfo.videoId,
          playerVars: {
              autoplay: videoInfo.autoplay,

              loop: videoInfo.loop,

              // controls: videoInfo.showControls,
              controls: 0,
              modestbranding: 1,
              enablejsapi: 1,
              showinfo: 0,
              rel: 0,
              playsinline: 1
          },
          events: {
              onReady: (event) => {
                this.onPlayerReady(event, player, videoInfo);
              },
              onStateChange: (event) => {
                if(videoInfo.loop===1 && !videoInfo.backgroundMode){
                  //自動再生&バックグランド出ない時のループ
                  this.onPlayerStateChange(event, player);
                }

              },
          },
      });

      this.players.push(player);
      this.playersInfo.push({player:player,videoInfo:videoInfo});
    });
  }

  onPlayerReady(event, player, videoInfo) {

    if (videoInfo.callBackFunc) {
      videoInfo.callBackFunc();
    }
    if (videoInfo.isMute) {
      player.mute();
      // console.log("mute")
    }

    if (!this.currentPlayer) {
      this.currentPlayer = player;
    }

    if (videoInfo.backgroundMode) {//背景モード 指定時間より前に任意でループ
      const duration = player.getDuration();

      player.playVideo();

      setInterval(() => {
        // console.log("LOOP!!!!!");
        player.seekTo(0);
      }, 1000 * (duration - this.seekTimeBeforeEnd));
    }else{
      if (videoInfo.autoStart) {//自動再生
        // console.log("自動再生",videoInfo.divId);
        player.playVideo();
          // player.seekTo(0);
      }else{
        // console.log("一旦停止");
        player.stopVideo();
      }
    }

  }

  onPlayerStateChange(event, player) {
    // console.log("onPlayerStateChange",event,player);
    if (event.data === YT.PlayerState.ENDED) {
      this.playersInfo.forEach((elm) => {
        if(elm.videoInfo.loop === 1 && !elm.videoInfo.backgroundMode){
          elm.player.playVideo();
        }
      });
    }
  }

  play() {
    if (this.currentPlayer) {
      this.currentPlayer.playVideo();
    }
  }
  playAll(isOnlyBgMode=true){
    this.playersInfo.forEach((elm) => {
      if(elm.player){
        if(isOnlyBgMode){
          if(elm.videoInfo.backgroundMode){
            elm.player.playVideo();
          }
        }else{
          elm.player.playVideo();
        }

      }
    });
  }

  playTarget(id){
    this.playersInfo.forEach((elm) => {
      // console.log(elm.videoInfo.divId);
      if(elm.videoInfo.divId === id){
        if(elm.player){
          elm.player.playVideo();
        }
      }
    });
  }

  pause() {
    if (this.currentPlayer) {
      this.currentPlayer.pauseVideo();
    }
  }

  stop() {
    if (this.currentPlayer) {
      this.currentPlayer.stopVideo();
      this.currentPlayer.seekTo(0);
    }
  }

  stopAllVideos(){
    this.players.forEach((player) => {
      player.stopVideo();
      player.seekTo(0);
    });
  }

  switchVideo(videoId) {
    const newPlayer = this.players.find((player) => player.getVideoData().video_id === videoId);
    if (newPlayer) {
      this.currentPlayer.pauseVideo();
      this.currentPlayer = newPlayer;
      this.currentPlayer.playVideo();
    }
  }
  changeVideo(id,videoId){
    this.playersInfo.forEach((elm) => {
      // console.log(elm.videoInfo.divId);
      if(elm.videoInfo.divId === id){
        if(elm.player){
          // elm.player.cueVideoById({videoId: videoId});
          elm.player.loadVideoById({videoId: videoId});
        }
      }
    });
  }

  destroy() {
    this.players.forEach((player) => player.destroy());
    this.players = [];
    this.currentPlayer = null;
  }
}
