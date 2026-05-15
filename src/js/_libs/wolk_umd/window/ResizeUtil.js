export default class ResizeUtil {
  static fit(target, imgW, imgH, marginY = 0, minW = 0, minH = 0) {
    let winW = Math.max(document.documentElement.clientWidth, minW);
    let winH = Math.max((document.documentElement.clientHeight - marginY), minH);
    let scaleW = winW / imgW;
    let scaleH = winH / imgH;
    let fixScale = Math.max(scaleW, scaleH);
    let wid = Math.ceil(imgW * fixScale);
    let hei = Math.ceil(imgH * fixScale);
    let centerX = Math.floor((winW - wid) / 2);
    let centerY = Math.floor((winH - hei) / 2);

    target.css({
      width: wid,
      height: hei,
      left: centerX,
      top: centerY
    });
  }

  static fitTM(target, imgW, imgH, marginY = 0, minW = 0, minH = 0) {
    let winW = Math.max(document.documentElement.clientWidth, minW);
    let winH = Math.max((document.documentElement.clientHeight - marginY), minH);
    let scaleW = winW / imgW;
    let scaleH = winH / imgH;
    let fixScale = Math.max(scaleW, scaleH);
    let wid = Math.ceil(imgW * fixScale);
    let hei = Math.ceil(imgH * fixScale);
    let centerX = Math.floor((winW - wid) / 2);
    let centerY = Math.floor((winH - hei) / 2);

    TweenMax.set(target, {width: wid,height: hei,x: centerX, y: centerY});
  }

  static fitTMPosPer(target, imgW, imgH, winW, winH, sclPer) {
    let scaleW = winW / imgW;
    let scaleH = winH / imgH;
    let fixScale = Math.max(scaleW, scaleH);
    let wid = Math.ceil(imgW * fixScale);
    let hei = Math.ceil(imgH * fixScale);
    let centerX = Math.floor((winW - wid) / 2);
    let centerY = Math.floor((winH - hei) / 2);

    TweenMax.set(target, {width: wid, height: hei, x: centerX / sclPer,y: centerY / sclPer});
  }

  static fitW100Center(target, winW, winH, imgW, imgH) {
    let scaleW = winW / imgW;
    let wid = Math.ceil(imgW * scaleW);
    let hei = Math.ceil(imgH * scaleW);
    let centerY = Math.floor((winH - hei) / 2);

    TweenMax.set(target, {width: wid,height: hei,y: centerY});
  }
}
