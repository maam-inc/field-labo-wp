export default class YoutubeUtil {
  static embedYt(id, videoId, wid = "0", hei = "0", param = "autoplay=0&showinfo=0&rel=0") {
    let element;

    if ((wid === "0" && hei === "0")) {
      element = ("<iframe src='https://www.youtube.com/embed/" + (videoId) + "?" + (param) + "' frameborder='0'></iframe>");
    } else {
      element = ("<iframe width='" + (wid) + "' height='" + (hei) + "' src='https://www.youtube.com/embed/" + (videoId) + "?" + (param) + "' frameborder='0'></iframe>");
    }

    document.getElementById(id).innerHTML = element;
  }

  static removeYt(id) {
    document.getElementById(id).innerHTML = "";
  }
};
