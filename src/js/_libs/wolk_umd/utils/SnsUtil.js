export default class SnsUtil {

  static shareFb(baseUrl){
    let url = encodeURIComponent(baseUrl);
    window.open('http://www.facebook.com/sharer/sharer.php?u=' + url, 'fbWin', 'width=580,height=380,scrollbars=no');
  }

  static shareTw(baseUrl,userStr){
    let url = "http://twitter.com/share?url="+encodeURIComponent(baseUrl)+"&text=" + encodeURIComponent(userStr);
    window.open(url, "twitter_share", 'width=580,height=380,scrollbars=no');
  }
  static shareTw2(baseUrl,userStr,hashTag){
    let url = "http://twitter.com/share?text="+encodeURIComponent(userStr)+"&url=" + encodeURIComponent(baseUrl)+"&hashtags="+encodeURIComponent(hashTag);
    window.open(url, "twitter_share", "width=580,height=380,scrollbars=no");
  }
  static shareLine(baseUrl){
    // let url = "http://line.me/R/msg/text/?"+userStr;
    let url = "https://lineit.line.me/share/ui?url="+baseUrl;
    window.open(url, "line_share", "width=580,height=380,scrollbars=no");
  }
  static sendLine(userStr){
    let url = "http://line.me/R/msg/text/?"+userStr;
    window.open(url, "line_send", "width=580,height=380,scrollbars=no");
  }
}
