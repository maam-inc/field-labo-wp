
export default class TxtUtil{

  static getSplitTxtAry(selector){
    $(selector).children().addBack().contents().each(function() {
      if (this.nodeType === 3) { $(this).replaceWith($(this).text().replace(/(\S)/g, "<span class=\"split-txt\">$1</span>")); }
    });
    let splitAry = $(selector).find(".split-txt");
    return splitAry;
  }

  static getSplitMskAry(selector){
    $(selector).children().addBack().contents().each(function() {
      if (this.nodeType === 3) { $(this).replaceWith($(this).text().replace(/(\S)/g, "<span class=\"split-msk\"><span class=\"txt\">$1</span></span>")); }
    });
    let splitAry = $(selector).find(".txt");
    return splitAry;
  }
}