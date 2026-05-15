
export default class SvgUtil{
  // svgのpathの長さをcssにセットする関数
  static setPath2Css($path){
    let len = undefined;
    const arr = [];
    return Array.prototype.slice.call($path).forEach(function(path, i) {
      arr.push(path);
      len = (arr[i].getTotalLength() + 30 + 1) | 0;
      // +30は、Firefox対策。+1 | 0 は小数点切り上げ
      arr[i].style.strokeDasharray = len;
      return arr[i].style.strokeDashoffset = len;
    });
  }

  // via http://zxcvbnmnbvcxz.com/tweenlite-svg-polygon/
  // 配列の値をpoints属性に設定
  static convertToPoints(target,ary){
    let svg = '';
    let i = 0;
    while (i < ary.length) {
      const str = i % 2 ? ary[i] + ' ' : ary[i] + ',';
      svg += str;
      i++;
    }

    return target.setAttribute('points', svg);
  }

}
