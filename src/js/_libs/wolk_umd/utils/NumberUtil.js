export default class NumberUtil{

  static numberOfDigits(number, digit) {
    let str = String(number);
    let i = 0;

    while(i < digit){
      str = "0" + str;
      i++;
    }
    return str.substr(str.length - digit, str.length);
  }

}