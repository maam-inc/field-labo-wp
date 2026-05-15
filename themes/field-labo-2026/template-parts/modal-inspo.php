    <div class="modal inspoModal" id="inspoModal" aria-hidden="true" style="display:none;">
      <div class="modal__bg js-modalClose" data-id="inspoModal">
        <div class="modal__container">
          <div class="modal__contents">
            <div class="modal__wrapper"> 
              <div class="modal__inner">
                <div class="js-modalContent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TEMPLATE インナー -->
    <template id="inspo-modal-template">
      <div class="main_img"></div>
      <div class="inspo-layout inspo-layout--main">
        <ul class="categorie_wrapper"></ul>
        <p class="text"></p>
        <div class="links-wrapper" hidden>
          <p class="link_head">関連記事</p>
          <ul class="links"></ul>
        </div>
      </div>
    </template>

    <!-- repeat template - img -->
    <template id="inspo-modal-img-template">
      <div class="img">
        <img src="" alt="">
      </div>
    </template>

    <!-- repeat template - cat -->
    <template id="inspo-modal-category-template">
      <li class="categorie"><a href=""></a></li>
    </template>

    <!-- repeat template - link -->
    <template id="inspo-modal-link-template">
      <li class="link">
        <p class="link_text"></p>
        <a class="link_btn" href="">READ</a>
      </li>
    </template>
