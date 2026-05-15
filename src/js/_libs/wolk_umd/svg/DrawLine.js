

// via http://2ndidea.com/svg/svg-path-drawing-animation-even-ie/
// svgをhtml埋め込みで使用
//
window.requestAnimFrame = ((() => callback => window.setTimeout(callback, 1000 / 60)))();
export default class DrawLine{
  rendered = false
  current_frame = 0
  fps = 60
  total_frame = 0
  handle = 0
  paths = []
  length = []




  constructor(svgIdName,time=1,fpsNum=60) {
    if (time == null) { time = 1; }
    if (fpsNum == null) { fpsNum = 60; }
    let svg = document.getElementById(svgIdName);
    this.fps = fpsNum;

    // console.log(svg)

    // 総フレーム数。
    this.total_frame = this.fps*time;

    // 初期化（破線の作成）
    // pathを取得してArray化した後、forEachにつっこむ。
    [].slice.call(svg.querySelectorAll('path')).forEach((path, i) => {
      console.log(this)
      this.paths[i] = path;
      // 長さ取得。firefoxでは少し短くなるので適当な数字を足す。
      // +30は、Firefox対策。+1 | 0 は小数点切り上げ
      let l = (this.paths[i].getTotalLength() + 30 + 1) | 0;
      this.length[i] = l;
      // pathの全長分の破線を作る（線が見えなくなる）。オフセットを0に動かすことで線を引くようなアニメーションに。
//      paths[i].style.strokeDasharray = l + ' ' + l #どっちが正しいか?
      this.paths[i].style.strokeDasharray = l;
      this.paths[i].style.strokeDashoffset = l;


    });


        //     // strokeDasharray, strokeDashoffsetは setPathLengthToStyle()で設定
        // });


  }

  // すでに描画されているか判定してアニメ開始関数(public)
  startRender() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    this.draw();
  }

  draw = () => {
    const progress = this.current_frame / this.total_frame;
    if (progress > 1) {
      // 現在のフレームと総フレームが等しくなれば終わり
      window.clearTimeout(this.handle);
    } else {
      // 1フレーム進める
      this.current_frame++;
      let j = 0;
      const len = this.paths.length;
      while (j < len) {
        // それぞれのpath要素のオフセットを縮める
        this.paths[j].style.strokeDashoffset = Math.floor(this.length[j] * (1 - progress));
        j++;
      }
      // this.handle = window.requestAnimationFrame(this.draw);
      this.handle = window.requestAnimFrame(this.draw);
      console.log("draw")
    }
  }
}
