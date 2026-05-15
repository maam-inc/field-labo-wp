export default class JqUtil{

  static addClassChildren(dom,clsName){
    let $children = $(dom).children();
    $children.addClass(clsName);
  }

  //主にScrollControllerでtargetInで使用
  static addScrlTarget(dom,clsName,att="",typeName=""){
    $(dom).addClass(clsName);
    if(att!="")
      $(dom).data(att,typeName);

  }
  //主にScrollControllerでtargetInで使用　domにul(子要素li)にclassや属性を付与
  static addScrlChildren(dom,clsName,att="",typeName=""){
    let $children = $(dom).children();
    $children.addClass(clsName);
    if(att!="")
      $children.data(att,typeName);
  }

  //テキストを一文字づつspanで囲む
  static divideChar(text){
    $(text).children().addBack().contents().each(function() {
      if (this.nodeType == 3) {
        $(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
      }
    });
  }
}