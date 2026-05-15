export default class GifSlider{
  constructor(params) {
    this.slider = params.slider;
    this.intervalTime = params.speed
    this.slideArray = Array.from(this.slider.querySelectorAll('.slider_slide'))
    this.pauseIndex = params.pauseIndex ?? null
    this.pauseTime = params.pauseTime ?? 3000
    this.isPause = false;
    this.timerId = null;
    this.CLASS_NOW = 'slider_slide--now'
    // this.CLASS_WILL_LEAVE = 'slider_slide--will-leave'
    this.now = 0;
  }

  play() {
    this.isPause = false;
    this.ticker()
  }

  ticker() {
    if(this.isPause) return;

    this.move()
    window.clearTimeout(this.timerId)

    if(this.pauseIndex) {
      const intervalTime = this.now === this.pauseIndex ? this.pauseTime : this.intervalTime
      this.timerId = window.setTimeout(() => { this.ticker() }, intervalTime)
    } else {
      this.timerId = window.setTimeout(() => { this.ticker() }, this.intervalTime)
    }
  }

  move() {
    const removeClass = (className) => {
      this.slideArray.forEach(slide => {
        if(slide.classList.contains(className)) {
          slide.classList.remove(className)
        }
      })
    }

    // removeClass(this.CLASS_WILL_LEAVE)

    // this.slideArray[this.now].classList.add(this.CLASS_WILL_LEAVE)

    this.setNow()

    removeClass(this.CLASS_NOW)

    this.slideArray[this.now].classList.add(this.CLASS_NOW)
  }

  setNow() {
    switch(this.now) {
      case this.slideArray.length - 1:
        this.now = 0;
        break

      default:
        this.now += 1;
        break
    }
  }

  pause () {
    window.clearTimeout(this.timerId)
    this.isPause = true;
  }
}