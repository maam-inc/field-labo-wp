
import ArrayUtil from "../utils/ArrayUtil";

export default class SvgTween{

  /*
  svgの各ポイントを動かす
  start = [[0, 500],[0, 0],[1920, 0],[1920, 500]]
  end = [[1025, 330],[1117, 171],[828, 206],[913, 260]]
  2次元配列時
  SvgTween.points(".clip",start,end,1.5,Expo.easeInOut)
   */

  static points(selector,startAry,endAray,time,ease,delay=0){
    if (delay == null) { delay = 0; }
    const TL = new TimelineLite;
    let points = [];
    // Create a tween for each point.
    return startAry.forEach((function(point, i) {
      const tween = TweenLite.to(point, time, endAray[i]);
      endAray[i].onUpdate = (function() {
        points.push(point.join());
        // Every 4 point update clip-path.
        if (points.length === endAray.length) {
          $(selector).attr('points', points.join(' '));
          // Reset.
          return points = [];
        }
      });

      tween.vars.ease = ease;
      // Add at position 0.
      return TL.add(tween, delay);
    })
    );
  }

  /*
  svgの各ポイントを動かす
  start = [0,500, 0,0, 1920,0, 1920,500]
  end = [1025,330, 1117,171, 828,206, 913,260]
  配列から変形
  SvgTween.ary2points(".clip",start,end,1.5,Expo.easeInOut)
  */
  static ary2points(selector,startAry,endAry,time,ease,delay=0){
    if (delay == null) { delay = 0; }
    const tween = TweenLite.to(startAry, time, endAry);
    tween.vars.ease = ease;
    endAry.onUpdate = (() => SvgTween.convertToPoints(selector,startAry));
  }

  /*
  svgの各ポイントを動かす
  start = "0,500 0,0 1920,0 1920,500"
  end = "1025,330 1117,171 828,206 913,260"
  Stringから変形(イラレ書き出しなどSVGデータからそのままコピーを使用時)
  SvgTween.ary2points(".clip",start,end,1.5,Expo.easeInOut)
  */
  static str2points(selector,startStr,endStr,time,ease,delay){
    if (delay == null) { delay = 0; }
    const start = startStr.replace(RegExp(' ', 'g'), ',');
//    startAry = start.split(',')
    const startAry = ArrayUtil.str2arr(start);
    const end = endStr.replace(RegExp(' ', 'g'), ',');
//    endAry = end.split(',')
    const endAry = ArrayUtil.str2arr(end);
    const tween = TweenLite.to(startAry, time, endAry);
    tween.vars.ease = ease;
    endAry.onUpdate = (() => SvgTween.convertToPoints(selector,startAry));
  }

  static setStr2points(selector,str){
    const replaceStr = str.replace(RegExp(' ', 'g'), ',');
    const strAry = ArrayUtil.str2arr(replaceStr);
    SvgTween.convertToPoints(selector,strAry);
  }

  static convertToPoints(target,ary){
    let svg = '';
    let i = 0;
    while (i < ary.length) {
      const str = i % 2 ? ary[i] + ' ' : ary[i] + ',';
      svg += str;
      i++;
    }
    $(target).attr('points', svg);
  }

}
