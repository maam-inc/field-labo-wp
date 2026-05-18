// TOP用
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Masonry from 'masonry-layout';

import UiManager from './_modules/UiManager';
import MainSwiper from './_modules/MainSwiper';
import Gallery from './_modules/wp-gallery';

if(!window.gsap) window.gsap = gsap;
if(!window.ScrollTrigger) window.ScrollTrigger = ScrollTrigger;

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);


const domContentLoaded = () => {
  console.log("domContentLoaded")
  
};

const loaded = () => {
  console.log('top js loaded')
  const uiManager = new UiManager;
  uiManager.init();
  const mainSwiper = new MainSwiper;
  mainSwiper.init();
  const masonryUi = new Gallery;
  masonryUi.init();

};


window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);


