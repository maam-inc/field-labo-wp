import imagesLoaded from 'imagesloaded';

export default class ImageLoaded{
  _loadedNum = 0;
  _totalImgs = 0;
  _timer = {};
  _imgLoad =null;
  _easePer = 0;
  _tag = null;

  _loadCompCount = 0;
  _loadCompTotal = 1;

  _compFunc = null;
  _realCompFunc = null;
  _progFunc = null;
  _progSpeed = 6;

  constructor(tag="body") {
    this._tag = tag;
    this._imgLoad = imagesLoaded(tag);
    this._totalImgs = this._imgLoad.images.length;
    // console.log(this._imgLoad.images,this._totalImgs);
  }
  getTotalImgs(){
    return this._totalImgs;
  }

  // シンプルロード時(回るローディングなど)　引数compFunc(完了コールバック),minTime(待機時間)
  load(compFunc,minTime=0){
    this._compFunc = compFunc;
    this._imgLoad.on('done', function() {
      compFunc();
    }).on('fail', function(instance) {
      // エラーハンドリング
    });
    // $(this._tag).imagesLoaded().done(function() {
    //   compFunc();
    // }).fail(function(instance) {

    // });
    // if (minTime != 0) {
    //   this._loadCompTotal = 2;
    //   setTimeout(compFunc, minTime * 1000);
    // }

  }

  // プログレスロード時(カウントアップやロードバー使用時など)
  //引数compFunc(完了コールバック),progFunc(引数にperを返す),progSpeed(イージング係数),realComp(本来のロード完了コールバック使いたい時)
  loadProgress(compFunc,progFunc,progSpeed=6,realComp=null){
    this._compFunc = compFunc;
    this._progFunc = progFunc;
    this._progSpeed = progSpeed;
    this._realCompFunc = realComp;
    let _this = this;
    $(this._tag).imagesLoaded().done(function() {
      if (realComp) {
        realComp();
      }
    }).progress(function(instance, image) {
      _this._loadedNum++;
    }).fail(function(instance) {});
    this._timer = setInterval(() => {

      this.updateProgress();
    }, 1000 / 33);
  }

  // private func........................
  // プログレスロード時用関数
  updateProgress(){
    let per = (this._loadedNum / this._totalImgs)*100;
    this._easePer += (per-this._easePer) / this._progSpeed;
    this._easePerInt = Math.ceil(this._easePer);

    // console.log(per,this._easePer,this._easePerInt);
    if(this._easePerInt >= 100){
      clearInterval(this._timer);
      this._compFunc();
    }
    this._progFunc({per:this._easePer, perInt:this._easePerInt});
  }

  // シンプルロード時用関数
  loadComp(){
    this._loadCompCount++;
    if(this._loadCompCount === this._loadCompTotal){
      this._compFunc();
    }

  }

}