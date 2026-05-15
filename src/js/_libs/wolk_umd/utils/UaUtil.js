export default class UaUtil {
  static  _ua = navigator.userAgent;
  static _userAgent = navigator.userAgent.toLowerCase();
  static _appVer = navigator.appVersion.toLowerCase();

  static isIE = UaUtil._userAgent.indexOf("msie") >= 0 || UaUtil._userAgent.indexOf("trident") >= 0;
  static ieVer = (UaUtil._appVer.indexOf("msie") > -1 ? parseInt(UaUtil._appVer.replace(/.*msie[ ]/, "").match(/^[0-9]+/)) : 0);
  static isSafari = UaUtil._userAgent.indexOf("safari") > -1 && UaUtil._userAgent.indexOf("chrome") === -1 ? true : false;
  static isChrome = UaUtil._userAgent.indexOf("chrome") > -1 ? true : false;
  static isFirefox = UaUtil._userAgent.indexOf("firefox") > -1 ? true : false;
  static isIPad = UaUtil._userAgent.indexOf("ipad") !== -1;
  static isIPhone = UaUtil._userAgent.indexOf("iphone") !== -1;
  static isIOS =  UaUtil.isIPad || UaUtil.isIPhone;
  static isAndroid = UaUtil._userAgent.indexOf("android") !== -1;
  static isPc = (UaUtil.isIOS || UaUtil.isAndroid ? false : true);

  static isSp = UaUtil._userAgent.indexOf('iphone') > 0 || UaUtil._userAgent.indexOf('ipod') > 0 || UaUtil._userAgent.indexOf('android') > 0 && UaUtil._userAgent.indexOf('mobile') > 0 ? true : false;
  static isTablet = !UaUtil.isSp && (UaUtil._userAgent.indexOf('ipad') > 0 || UaUtil._userAgent.indexOf('android') > 0) ? true : false;

  static getUa() {
    return UaUtil._userAgent
  }

  static getAppVer() {
    return UaUtil._appVer
  }

  static checkIeVer(ver) {
    let flg = false
    if (ver === this.ieVer) {
      flg = true;
    }
    return flg;
  }
  static checkIeUnder(ver) {
    let flg = false
    if (ver <= this.ieVer) {
      flg = true;
    }
    return flg;
  }

  static getIsWindows() {
    let isWin;
    isWin = false;
    if (navigator.platform.indexOf("Win") !== -1) {
      isWin = true;
      return isWin;
    }
  }

  static getIosVer() {
    let version;
    if (this.isIOS) {
      UaUtil._ua.match(/iPhone OS (¥w+){1,3}/g);
      version = RegExp.$1.replace("_", ".");
      return version;
    }
  }

  static getAndroidVer() {
    let version;
    if (this.isAndroid) {
      version = parseFloat(UaUtil._ua.slice(UaUtil._ua.indexOf('Android') + 8));
      return version;
    }
  }

  //アンドロイド標準ブラウザ
  static isAndroidStdBr() {
    let isAndroidBrowser;
    isAndroidBrowser = false;
    if (/Android/.test(UaUtil._ua) && /Linux; U;/.test(UaUtil._ua) && !/Chrome/.test(UaUtil._ua)) {
      isAndroidBrowser = true;
    }
    return isAndroidBrowser;
  }
}
