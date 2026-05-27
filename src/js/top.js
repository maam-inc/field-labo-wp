// TOP用
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Masonry from 'masonry-layout';

import UiManager from './_modules/UiManager';
import MainSwiper from './_modules/MainSwiper';
import Gallery from './_modules/wp-gallery';
import TopSlider from './_modules/TopSlider';


if(!window.gsap) window.gsap = gsap;
if(!window.ScrollTrigger) window.ScrollTrigger = ScrollTrigger;

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);


const domContentLoaded = () => {
  console.log("[top.js]domContentLoaded")
  // const mainSwiper = new MainSwiper;
  // mainSwiper.init();
  const gallery = new Gallery;
  gallery.init();
  const topSlider = new TopSlider;
  topSlider.init();

};

const loaded = () => {
  console.log('top js loaded')

};


window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);


