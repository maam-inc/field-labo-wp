// 投稿

// import { gsap } from 'gsap';
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PostModal from './_modules/PostModal';
import PostAnim from './_modules/PostAnim';
import PageLoaded from './_modules/wp/pageLoaded'

import imagesLoaded from 'imagesloaded';

// if(!window.gsap) window.gsap = gsap;
// if(!window.ScrollTrigger) window.ScrollTrigger = ScrollTrigger;

// gsap.registerPlugin(ScrollToPlugin);
// gsap.registerPlugin(ScrollTrigger);


const domContentLoaded = () => {
  console.log("domContentLoaded")
  new PostModal().init();
  imagesLoaded('#article .main', () => {
    new PostAnim().init();
    PageLoaded.getInstance().init();
  })
};

const loaded = () => {

};


window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);


