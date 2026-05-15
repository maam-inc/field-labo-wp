

export default class V{

  //クラスの追加
  static addClass(id,className){
    document.getElementById(id).classList.add(className);
  }
  static addClassQs(cls,className){
    // document.querySelector(".element").classList.add(className);
    document.querySelector(cls).classList.add(className);
  }
  //クラスの削除
  static removeClass(id,className){
    document.getElementById(id).classList.remove(className);
  }
  static removeClassQs(cls,className){
    document.querySelector(cls).classList.remove(className);
  }
  //クラスのトグル
  static toggleClass(id,className){
    document.getElementById(id).classList.toggle(className);
  }
  static toggleClassQs(cls,className){
    document.querySelector(cls).classList.toggle(className);
  }
  //クラス名判別
  static hasClass(id,className){
    document.getElementById(id).classList.contains(className);
  }
  static hasClassQs(cls,className){
    document.querySelector(cls).classList.contains(className);
  }

  //属性の取得
  static getAttr(id,data){
    document.getElementById(id).getAttribute(data);
  }
  //属性の設定
  static setAttr(id,data,prop){
    document.getElementById(id).setAttribute(data,prop);
  }
  //属性の削除
  static removeAttr(id,data,prop){
    document.getElementById(id).removeAttribute(data);
  }

  //css一括指定
  static setStyles(id,stylesStr){
    //複数のstyleを設定
    // document.getElementById(id).style.cssText = 'width: 100%; background-color:red;';
    document.getElementById(id).style.cssText = stylesStr;
  }
  static setObjStyles(id,stylesObj){
    /*
    const stylesObj = {
      visibility: 'visible',
      overflow: 'hidden',
    };
    //  オブジェクトキーはハイフンが使えないので適用されない
    const stylesObj = {
      background-color: 'red',
      z-index: '100',
    };
    */
    Object.keys(stylesObj).forEach((key) => {
      document.getElementById(id).style.setProperty(key, stylesObj[key]);
    });
  }

  static delayCall(func,delaySec){
    setTimeout(func, delaySec/1000);
  }


  /*-----------------------------------
  offset
  ------------------------------------*/
  //top
  static getOffsetTop(id){
    let target = document.getElementById(id);
    let rect = target.getBoundingClientRect();
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
  }
  //left
  static getOffsetLeft(id){
    let target = document.getElementById(id);
    let rect = target.getBoundingClientRect();
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    return rect.left + scrollLeft;
  }

  /*-----------------------------------
  scroll
  ------------------------------------*/
  //$(window).scrollTop();
  static getWinScrlTop(){
    return document.documentElement.scrollTop || document.body.scrollTop;
  }
  static setWinScrlTop(x=0,y=0){
    window.scrollTo(x, y);
  }


  ////// TIPS //////

  // ループ処理
  /*
  const elems = document.getElementsByClassName('.target'); //複数の要素を取得
  //１番処理が早い
  for (let i = 0; i < elems.length; i++) {
    console.log(i, elems[i]);
  }

  let elems = document.querySelectorAll("hoge");
  elems.forEach(function (elem, index) {
    elem.textContent(index + "処理内容" + elem);
  });

  //処理が遅い
  const arr_elems = Array.from( elems ); //HTMLCollectionやNodeListは１度、配列化すること
    arr_elems.forEach(function( i, val ) {
    console.log(i, val);
  });
  */

  //実行関数
  //速攻で実行 （即時関数）
  /*
  (function() {

  }());

  //DOM構造が読み込まれた段階で実行
  document.addEventListener('DOMContentLoaded', function() {

  });


  ///DOM構造やCSS、画像など、サイト表示に必要なものをすべて読み込んだタイミングで実行
  window.addEventListener('load', function(){

  });
  */

  //マウスイベント
  /*
  const elem = document.querySelector('.button');
  //マウスカーソルが被さった時の処理
  elem.addEventListener('mouseenter', function(){
    // 何らかの処理
  });

  //マウスカーソルが離れた時の処理
  elem.addEventListener('mouseleave', function(){
    // 何らかの処理
  });

  //マウスカーソルが被さった時の処理
  elem.addEventListener('mouseover', function(){
    // 何らかの処理
  });

  //マウスカーソルが離れた時の処理
  elem.addEventListener('mouseout', function(){
    // 何らかの処理
  });
  */


}