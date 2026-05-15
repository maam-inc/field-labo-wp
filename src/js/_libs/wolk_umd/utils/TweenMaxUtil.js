
import UaUtil from "./UaUtil";

export default class TweenMaxUtil{

  static brightness(target,time,startParam,endParam,easeing,delay=0){
    if(UaUtil.isIE){
      return;
    }
    let obj = {
      brParam: startParam
    };
    TweenLite.to(obj, time, {
      brParam: endParam,
      ease: easeing,
      delay: delay,
      onUpdate: function() {
        TweenLite.set(target, {
          '-webkit-filter': 'brightness(' + obj.brParam + ')'
        });
        TweenLite.set(target, {
          'filter': 'brightness(' + obj.brParam + ')'
        });
      }
    });
  }

  static setBrightness(target, param){
    if(UaUtil.isIE){
      return;
    }
    TweenLite.set(target, {
      '-webkit-filter': 'brightness(' + param + ')'
    });
    TweenLite.set(target, {
      'filter': 'brightness(' + param + ')'
    });
  }
  static blur(target, time, startParam, endParam, easeing, delay){
    let obj = {
      brParam: startParam
    };
    return TweenLite.to(obj, time, {
      brParam: endParam,
      ease: easeing,
      delay: delay,
      onUpdate: function() {
        return TweenMax.set(target, {
          '-webkit-filter': 'blur(' + obj.brParam + 'px)',
          'filter': 'blur(' + obj.brParam + 'px)'
        });
      }
    });
  }

}