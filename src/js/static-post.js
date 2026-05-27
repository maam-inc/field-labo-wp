// 投稿

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PostModal from './_modules/PostModal';

if(!window.gsap) window.gsap = gsap;
if(!window.ScrollTrigger) window.ScrollTrigger = ScrollTrigger;

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);


const domContentLoaded = () => {
  new PostModal().init();
};

const loaded = () => {

};


window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);


