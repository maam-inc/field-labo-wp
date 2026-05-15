export default class CookieUtil{

  static saveCookie(key,value,days=7,param=null){
    let option = (param === null) ? { expires: days } : param
    $.cookie(key, value, option);
  }
  static getCookie(key){
    return $.cookie(key)
  }
  static removeCookie(key){
    $.removeCookie(key);
  }
  //objectを文字列に
  static obj2Str(obj){
    return JSON.stringify(obj)
  }
  //文字列をobjectに
  static str2Obj(str){
    return JSON.parse(str)
  }
}