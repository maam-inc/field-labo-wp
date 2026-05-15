export default class EmbedPictureFill{

  //piture ie用polifill

  static setIe(url="assets/js/lib/picturefill.min.js"){
    var userAgent = window.navigator.userAgent.toLowerCase();
    if( userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1 ){
      document.write(`<script src=${url} async></script>`);
    }
  }
  static write(url="assets/js/lib/picturefill.min.js"){
    document.write(`<script src=${url} async></script>`);
  }

}