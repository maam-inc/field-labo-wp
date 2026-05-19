// 固定ページ&faq 用

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import UiManager from './_modules/UiManager';
import CommonModal from './_modules/commonModal';

if(!window.gsap) window.gsap = gsap;
if(!window.ScrollTrigger) window.ScrollTrigger = ScrollTrigger;

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);


const domContentLoaded = () => {
  console.log("[static-page]domContentLoaded")

};

const loaded = () => {
  const uiManager = new UiManager;
  uiManager.init();
  const commonModal = new CommonModal;
  commonModal.init();
};


window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);


