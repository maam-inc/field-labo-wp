export default class ArrayUtil{

  //シャッフル
  static shuffle(array){
    const ary = array;
    let i = ary.length;
    let j = 0;
    let t = undefined;
    while (i) {
      j = Math.floor(Math.random() * i);
      t = ary[--i];
      ary[i] = ary[j];
      ary[j] = t;
    }
    return ary;
  }

  //ディープコピー
  static clone(obj){
    if ((obj == null) || (typeof obj !== 'object')) {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }

    if (obj instanceof RegExp) {
      let flags = '';
      if (obj.global != null) { flags += 'g'; }
      if (obj.ignoreCase != null) { flags += 'i'; }
      if (obj.multiline != null) { flags += 'm'; }
      if (obj.sticky != null) { flags += 'y'; }
      return new RegExp(obj.source, flags);
    }

    const newInstance = new obj.constructor();

    for (let key in obj) {
      newInstance[key] = this.clone(obj[key]);
    }

    return newInstance;
  }
  
  /*
  // "1-3,5"を1,2,3,5の配列に変える
  */
  static str2arr(str){
    const tmp = str.split(',');
    const arr = Array();
    let n = 0;
    while (n < tmp.length) {
      if (tmp[n].indexOf('-', 0) !== -1) {
        const rng = tmp[n].split('-');
        if (rng.length !== 2) {
          return false;
        }
        if ((rng[0] === '') || (rng[1] === '')) {
          return false;
        }
        const st = Number(rng[0]);
        const ed = Number(rng[1]);
        let i = st;
        while (i <= ed) {
          arr.push(i);
          i++;
        }
      } else {
        if (tmp[n] === '') {
          return false;
        }
        arr.push(Number(tmp[n]));
      }
      n++;
    }
//    arr = uniqArray(arr)
    return arr;
  }

}
