// Project, index アーカイブページ

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import DummyUi from './_modules/DummyUi';
import LoadMoreAnim from './_modules/LoadMoreAnim';

if(!window.gsap) window.gsap = gsap;
if(!window.ScrollTrigger) window.ScrollTrigger = ScrollTrigger;

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);


const domContentLoaded = () => {
};

const loaded = () => {
  // ↓↓↓↓↓↓↓↓↓↓↓↓アニメーション↓↓↓↓↓↓↓↓↓↓↓↓
  // loadmore表示アニメーション
  const loadMoreAnim = new LoadMoreAnim;
  // ↑↑↑↑↑↑↑↑↑↑↑↑アニメーション↑↑↑↑↑↑↑↑↑↑↑↑

  // ↓↓↓↓↓↓↓↓↓↓↓↓静的用JS↓↓↓↓↓↓↓↓↓↓↓↓
  const dummyUi = new DummyUi({ loadMoreAnim });
  dummyUi.init();
  // ↑↑↑↑↑↑↑↑↑↑↑↑静的用JS↑↑↑↑↑↑↑↑↑↑↑↑
};


window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);


