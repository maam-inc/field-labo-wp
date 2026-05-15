

export default class VCDrawLine{

  static stroke(svgId,time=1000,strokeCol="#000",ease="easeOutSine",strokeWid=1){
    const $path = $(svgId).find("path");
    VCDrawLine.setPath2Css($path);

    $path.css({
      stroke: strokeCol,
      fill: 'none',
      strokeWidth: strokeWid
    });

    // アニメーション描画
    $path.velocity({ strokeDashoffset: 0 }, time, 'easeOutCubic');
  }

  // 背景塗りつぶしアニメ
  static fill(svgId,time,delay=0,fillCol="#000",ease="linear"){
    const $path = $(svgId).find("path");
    $path.velocity({ fill: fillCol }, { queue: false ,delay}, time, ease);
  }

  //一文字(path単位)づつdelay描画、塗りなし
  static delayStroke(svgId,time=1000,delayNum=100,col="#000",ease="easeOutCubic",strokeWid=1){
    const $path = $(svgId).find("path");
    VCDrawLine.setPath2Css($path);
    const pathLength = $path.length;

    $path.css({
      stroke: col,
      fill: 'none',
      strokeWidth: strokeWid
    });

    // アニメーション描画
    $path.each(function(i) {
      $(this).velocity({ strokeDashoffset: 0 }, {
        delay: delayNum * i,
        duration: time
      }
      );
    });
  }

  //一文字(path単位)づつdelay描画完成後に塗り
  static strokeDelay(svgId,time=1000,delayNum=100,col="#000",ease="easeOutCubic",strokeWid=1,fillTime=1000,fillEase="linear"){
    const $path = $(svgId).find("path");
    VCDrawLine.setPath2Css($path);
    const pathLength = $path.length;

    $path.css({
      stroke: col,
      fill: 'none',
      strokeWidth: strokeWid
    });

    // アニメーション描画
    $path.each(function(i) {
      $(this).velocity({ strokeDashoffset: 0 }, {
        delay: delayNum * i,
        duration: time,
        complete() {
          // ifを外して$(this)にすると、それぞれ終わった直後に塗りつぶしされていく
          if (i === (pathLength - 1)) {
            $path.velocity({ fill: col }, fillTime, fillEase);
          }
        }
      }
      );
    });
  }

  //一文字(path単位)づつdelay描画、塗りもdelay効果
  static strokeDelayFill(svgId,time=1000,delayNum=100,delayFill=700,col="#000",ease="easeOutCubic",strokeWid=1,fillTime=700,fillEase="easeOutSine"){
    const $path = $(svgId).find("path");
    VCDrawLine.setPath2Css($path);
    const pathLength = $path.length;

    $path.css({
      stroke: col,
      fill: 'none',
      strokeWidth: strokeWid
    });

    // アニメーション描画
    $path.each(function(i) {
      $(this).velocity({ strokeDashoffset: 0 }, {
        delay: delayNum * i,
        duration: time
      }
      );

      $(this).velocity({ fill: col }, { queue: false ,delay:delayFill+(delayNum * i)}, fillTime, fillEase);
    });
  }

  // svgのpathの長さをcssにセットする関数
  static setPath2Css($path){
    let len = undefined;
    const arr = [];
    Array.prototype.slice.call($path).forEach(function(path, i) {
      arr.push(path);
      len = (arr[i].getTotalLength() + 30 + 1) | 0;
      // +30は、Firefox対策。+1 | 0 は小数点切り上げ
      arr[i].style.strokeDasharray = len;
      arr[i].style.strokeDashoffset = len;
    });
  }

}
