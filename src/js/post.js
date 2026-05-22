// 投稿

// import { gsap } from 'gsap';
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GalleryModal from './_modules/galleryModal';
import DataModal from './_modules/DataModal';

// if(!window.gsap) window.gsap = gsap;
// if(!window.ScrollTrigger) window.ScrollTrigger = ScrollTrigger;

// gsap.registerPlugin(ScrollToPlugin);
// gsap.registerPlugin(ScrollTrigger);


const domContentLoaded = () => {
  console.log("domContentLoaded")
  new GalleryModal().init();
  new DataModal().init();
};

const loaded = () => {

};


window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);


