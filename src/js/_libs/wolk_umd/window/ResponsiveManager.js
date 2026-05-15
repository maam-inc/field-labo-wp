
export default class ResponsiveManager {
  isPCMode = true
  isSPMode = true

  static switchImg(clsName=".switch",breakPoint=640,pcStr="_pc",spStr="_sp"){
    let $setElem, pcName, replaceWid, spName;

    // $setElem = $(clsName);
    $setElem = document.querySelectorAll(clsName);
    pcName = pcStr;
    spName = spStr;
    replaceWid = breakPoint;
    // $setElem.each(function() {
    for (let i = 0; i < $setElem.length; i++) {
      let $this, winW;
      // $this = $(this);
      $this = $setElem[i];
      // winW = parseInt($(window).width());
      winW = parseInt(document.documentElement.clientWidth);
      if (winW >= replaceWid) {
        if (isSPMode) {
          // $this.attr('src', $this.attr('src').replace(spName, pcName)).css({
          //   visibility: 'visible'
          // });
          let param = $this.setAttribute('src', $this.getAttribute('src').replace(spName, pcName));
          // getComputedStyle($this,"").visibility = param;
          $this.style.visibility = param;
        }
        isPCMode = true;
        isSPMode = false;
      } else if (winW < replaceWid) {
        if (isPCMode) {
          // $this.attr('src', $this.attr('src').replace(pcName, spName)).css({
          //   visibility: 'visible'
          // });
          let param = $this.setAttribute('src', $this.getAttribute('src').replace(pcName, spName));
          // getComputedStyle($this,"").visibility = param;
          $this.style.visibility = param;
        }
        isPCMode = false;
        isSPMode = true;
      }
    }

  }


  static switchImgSp(clsName=".switch",pcStr="pc",spStr="sp") {
    let $setElem;
    // $setElem = $(clsName);
    $setElem = document.querySelectorAll(clsName);
    // $setElem.each(function() {
    for (let i = 0; i < $setElem.length; i++) {
      let $this;
      // $this = $(this);
      $this = $setElem[i];;
      // $this.attr('src', $this.attr('src').replace(pcStr, spStr)).css({
      //   visibility: 'visible'
      // });
      let param = $this.setAttribute('src', $this.getAttribute('src').replace(pcStr, spStr));

      // getComputedStyle($this,"").visibility = param;
      $this.style.visibility = param;
    }

  }

  static switchImgPc(clsName=".switch",pcStr="pc",spStr="sp") {
    let $setElem;
    // $setElem = $(clsName);
    $setElem = document.querySelectorAll(clsName);
    // $setElem.each(function() {
    for (let i = 0; i < $setElem.length; i++) {
      let $this;
      // $this = $(this);
      $this = $setElem[i];
      /*
      $this.attr('src', $this.attr('src').replace(spStr, pcStr)).css({
        visibility: 'visible'
      });
      */
      let param = $this.setAttribute('src', $this.getAttribute('src').replace(spStr, pcStr));

      // getComputedStyle($this,"").visibility = param;
      $this.style.visibility = param;
    }

  }


  // svgが未対応な場合pngに変更(アンドロイド5以下)
  /*
  svg2Png(imgTag="img",bgImgTag=".svg-bg") {
    let $img;
    $img = $(imgTag);
    $img.each(function(index, value) {
      let $this, src;
      $this = $(this);
      src = $this.attr('src');
      if (src.match(/\.svg$/)) {
        $this.attr('src', src.replace(/\.svg$/, '.png'));
      }
    });
    $(bgImgTag).each(function() {
      let $this, backgroundImage;
      $this = $(this);
      backgroundImage = $this.css('background-image') || '';
      if (backgroundImage.match(/\.svg/)) {
        $this.css('background-image', backgroundImage.replace('.svg', '.png'));
      }
    });
  }
  */


}
