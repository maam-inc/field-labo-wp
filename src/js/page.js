// 固定ページ&faq 用

// import { gsap } from 'gsap';
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// if(!window.gsap) window.gsap = gsap;
// if(!window.ScrollTrigger) window.ScrollTrigger = ScrollTrigger;

// gsap.registerPlugin(ScrollToPlugin);
// gsap.registerPlugin(ScrollTrigger);

import PageLoaded from './_modules/wp/pageLoaded'
import FaqModal from './_modules/wp/faqModal';


const domContentLoaded = () => {
  console.log("[page.js]domContentLoaded")
  FaqModal.getInstance().init()
  PageLoaded.getInstance().init();
};

const loaded = () => {

};


window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);


