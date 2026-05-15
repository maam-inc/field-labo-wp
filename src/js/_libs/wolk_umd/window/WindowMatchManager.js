
import ResponsiveManager from "./ResponsiveManager";

let _instance = null;

export default class WindowMatchManager {
  isSwitchImg = true;
  isSpMode = true;
  mediaType = "sp";
  constructor() {
    if ( _instance !== null ) {
      throw new Error('SingleTon.instance()');
    }
    if ( _instance === null ) {
        _instance = this;
    }

    return _instance;
  }
  static getInstance() {
    if ( _instance === null ) {
      _instance = new WindowMatchManager();
    }
    return _instance;
  }

  init(breakPoint=768,isSwitchImg){
    this.isSwitchImg = isSwitchImg
    console.log("WindowMatch");
    const mqList = window.matchMedia(`(min-width: ${breakPoint}px)`);
    // mqList.addListener(listener); // @deprecated
    mqList.addEventListener("change", this.windowCheck);
    this.windowCheck(mqList);
  }

  windowCheck(e){
    if (e.matches) {
      // 768px以上 PC用ブレークポイン

      this.isSpMode = false;
      this.mediaType = "pc";
      console.log('PC 768px以上',this.isSpMode,this.mediaType);
      if(this.isSwitchImg){
        ResponsiveManager.switchImgPc();
      }
    } else {
      // 768px未満 SP用ブレークポイント

      this.isSpMode = true;
      this.mediaType = "sp";
      console.log('SP 768px未満',this.isSpMode,this.mediaType);
      if(this.isSwitchImg){
        ResponsiveManager.switchImgSp();
      }
    }
  }

}