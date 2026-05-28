// 固定ページ&faq 用

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import DummyUi from './_modules/DummyUi';

import CommonModalAnim from './_modules/commonModalAnim';

if(!window.gsap) window.gsap = gsap;
if(!window.ScrollTrigger) window.ScrollTrigger = ScrollTrigger;

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);


const domContentLoaded = () => {
};

const loaded = () => {
  // ↓↓↓↓↓↓↓↓↓↓↓↓アニメーション↓↓↓↓↓↓↓↓↓↓↓↓
  // TOP・FAQのモーダルアニメーション
  const commonModalAnim = new CommonModalAnim;
  // ↑↑↑↑↑↑↑↑↑↑↑↑アニメーション↑↑↑↑↑↑↑↑↑↑↑↑

  // ↓↓↓↓↓↓↓↓↓↓↓↓静的用JS↓↓↓↓↓↓↓↓↓↓↓↓
  const dummyUi = new DummyUi({ commonModalAnim });
  dummyUi.init(); 
  // ↑↑↑↑↑↑↑↑↑↑↑↑静的用JS↑↑↑↑↑↑↑↑↑↑↑↑
};


window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);


