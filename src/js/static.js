// 静的テンプレート専用。 WPには設置しないもの

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadMore from './_modules/LoadMore';

if(!window.gsap) window.gsap = gsap;
if(!window.ScrollTrigger) window.ScrollTrigger = ScrollTrigger;

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);


const domContentLoaded = () => {
  console.log("domContentLoaded")
  const loadMore = new LoadMore;
  loadMore.init();
};

const loaded = () => {

};


window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);


