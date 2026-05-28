// 共通

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import UiManager from './_modules/UiManager';
import Menu from './_modules/Menu';

if(!window.gsap) window.gsap = gsap;
if(!window.ScrollTrigger) window.ScrollTrigger = ScrollTrigger;

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);


const domContentLoaded = () => {
  console.log("[static-common]domContentLoaded")
  const uiManager = new UiManager;
  uiManager.init();
  new Menu().init();
};

const loaded = () => {
  document.documentElement.classList.add('is-loaded');
};


window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);


