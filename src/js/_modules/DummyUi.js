export default class DummyUi {

  // 使うページが必要な anim だけ渡せるようにオプション引数で受け取る
  constructor({ commonModalAnim, orderCtrlAnim, loadMoreAnim } = {}){
    this.anim = commonModalAnim;
    this.orderAnim = orderCtrlAnim;
    this.loadAnim = loadMoreAnim;
  }

  init(){
    this.modalUi();
    this.orderUi();
    this.loadMoreUi();
  }
  // ---------------------------------
  // TOP / FAQ の共通モーダルUI
  // ---------------------------------
  modalUi(){
    const elm = document.querySelector(`.l-modal`);
    if(!elm || !this.anim) return;
    document.querySelectorAll('.btn-open').forEach((item) => {
      item.addEventListener('click', () => {
        this.anim.openModal(elm);
      });
    });

    document.querySelectorAll('.btn-close').forEach((item) => {
      item.addEventListener('click', () => {
        this.anim.closeModal(elm);
      });
    });
  }

  // ---------------------------------
  // TOP の並び替えUI
  // ---------------------------------
  orderUi(){
    if(!this.orderAnim) return;

    const ctrls = document.querySelectorAll('.order__ctrl');
    ctrls.forEach((ctrl) => {
      ctrl.querySelectorAll('.order__ctrl-name').forEach((btn) => {
        btn.addEventListener('click', () => this.onOrderClick(btn, ctrls));
      });
    });

    const sorts = document.querySelectorAll('.sort__lists');
    sorts.forEach((sel) => {
      sel.addEventListener('change', () => this.onSortChange(sel, sorts));
    });
  }

  onSortChange(changed, sorts){
    sorts.forEach((sel) => {
      if (sel !== changed) sel.value = changed.value;
    });
    this.runSort();
  }

  onOrderClick(clicked, ctrls){
    const isRandom = clicked.classList.contains('order__ctrl-random');
    const targetClass = isRandom ? 'order__ctrl-random' : 'order__ctrl-latest';

    if (clicked.classList.contains('is-active')) return;

    ctrls.forEach((ctrl) => {
      ctrl.querySelectorAll('.order__ctrl-name').forEach((btn) => {
        btn.classList.toggle('is-active', btn.classList.contains(targetClass));
      });
    });

    this.runSort();
  }

  runSort(){
    this.orderAnim.hide();
    this.orderAnim.show();
  }

  // ---------------------------------
  // loadmore：投稿が追加されたら表示アニメ
  // TOP・blog・projects で使い回せるよう、コンテナ/アイテムのクラスを対応表で持つ
  // ---------------------------------
  loadMoreUi(){
    if (!this.loadAnim) return;

    const galleries = [
      { wrapper: '.topContents__gallery-wrapper', item: 'topContents__item' },
      { wrapper: '.blog__gallery-wrapper',        item: 'blog__gallery-item' },
      { wrapper: '.projects__gallery-wrapper',    item: 'projects__gallery-item' },
    ];

    galleries.forEach(({ wrapper, item }) => {
      const container = document.querySelector(wrapper);
      if (!container) return;
      this.observeNewItems(container, item);
    });
  }

  observeNewItems(container, itemClass){
    const observer = new MutationObserver((mutations) => {
      // 1コールバック内で追加された item をまとめて取得
      const newItems = [];
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (!node.classList.contains(itemClass)) return;
          // クラス付与→このクラスを持つ要素にアニメーション
          node.classList.add('is-add');
          newItems.push(node);
        });
      });
      if (newItems.length) this.loadAnim.fadeIn(newItems);
    });
    observer.observe(container, { childList: true });
  }
}