// TOP用
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Masonry from 'masonry-layout';
import MasonryUi from './_modules/MasonryUi';
import TopSlider from './_modules/TopSlider';
import DummyUi from './_modules/DummyUi';

import CommonModalAnim from './_modules/commonModalAnim';
import OrderCtrlAnim from './_modules/OrderCtrlAnim';
import LoadMoreAnim from './_modules/LoadMoreAnim';


if(!window.gsap) window.gsap = gsap;
if(!window.ScrollTrigger) window.ScrollTrigger = ScrollTrigger;

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);


const domContentLoaded = () => {
  
};

const loaded = () => {
  const masonryUi = new MasonryUi;
  masonryUi.init();
  const topSlider = new TopSlider;
  topSlider.init();

  // ↓↓↓↓↓↓↓↓↓↓↓↓アニメーション↓↓↓↓↓↓↓↓↓↓↓↓
  // TOP・FAQのモーダルアニメーション
  const commonModalAnim = new CommonModalAnim;
  // TOPの並び替えアニメーション
  const orderCtrlAnim = new OrderCtrlAnim;
  // loadmore表示アニメーション
  const loadMoreAnim = new LoadMoreAnim;
  // ↑↑↑↑↑↑↑↑↑↑↑↑アニメーション↑↑↑↑↑↑↑↑↑↑↑↑

  // ↓↓↓↓↓↓↓↓↓↓↓↓静的用JS↓↓↓↓↓↓↓↓↓↓↓↓
  const dummyUi = new DummyUi({ commonModalAnim, orderCtrlAnim, loadMoreAnim });
  dummyUi.init();
  // ↑↑↑↑↑↑↑↑↑↑↑↑静的用JS↑↑↑↑↑↑↑↑↑↑↑↑
};


window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);


