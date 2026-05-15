
/// by https://digipress.info/tech/how-to-include-youtube-vimeo-video-with-autoplay-slick-js/

/// https://codepen.io/digistate/pen/MvapbE
export default class YoutubeApiUtil {
  static postMessageToPlayer(player, command){
    // console.log("postMessageToPlayer",player,command)
    if (player == null || command == null) return;
    player.contentWindow.postMessage(JSON.stringify(command), "*");
  }

  static playPauseVideo(target, control){
    let player = target.find("iframe").get(0);
    switch (control) {
      case "play":
        YoutubeApiUtil.postMessageToPlayer(player, {
          "event": "command",
          "func": "playVideo"
        });
        break;
      case "playMute":
        YoutubeApiUtil.postMessageToPlayer(player, {
          "event": "command",
          "func": "mute"
        });
        YoutubeApiUtil.postMessageToPlayer(player, {
          "event": "command",
          "func": "playVideo"
        });
        break;
      case "pause":
        YoutubeApiUtil.postMessageToPlayer(player, {
          "event": "command",
          "func": "pauseVideo"
        });
        break;
    }
  }
  static onStateChange(target, control){

  }
  static playPauseVideoSlick(slick, control){
    let currentSlide = slick.find(".slick-current");
    let player = currentSlide.find("iframe").get(0);
    switch (control) {
      case "play":
        YoutubeApiUtil.postMessageToPlayer(player, {
          "event": "command",
          "func": "playVideo"
        });
        break;
      case "playMute":
        YoutubeApiUtil.postMessageToPlayer(player, {
          "event": "command",
          "func": "mute"
        });
        postMessageToPlayer(player, {
          "event": "command",
          "func": "playVideo"
        });
        break;
      case "pause":
        YoutubeApiUtil.postMessageToPlayer(player, {
          "event": "command",
          "func": "pauseVideo"
        });
        break;
    }
  }
}