    <!-- TEMPLATE インナー -->
    <template id="inspo-modal-template">
      <div class="img-box"><!-- #inspo-modal-img-template --></div>
      <p class="text f-noto-M"><!-- ここにキャプション --></p>
      <div class="flex_box">
        <div class="related_articles flex_box-item">
          <p class="related_articles-head flex_box-head f-inter-B">related article</p>
          <ul class="related_articles-wrapper">
            <!-- #inspo-modal-link-template -->
          </ul>
        </div>
        <div class="tag f-inter-B flex_box-item">
          <p class="tag-head flex_box-head">tag</p>
          <ul class="tag-wrapper">
            <!-- #inspo-modal-category-template -->
          </ul>
        </div>
      </div>
      <div class="inspo-layout inspo-layout--main">
        <ul class="categorie_wrapper"></ul>        
        <div class="links-wrapper" hidden>
          <p class="link_head">関連記事</p>
          <ul class="links"></ul>
        </div>
      </div>
    </template>


    <!-- repeat template - img -->
    <template id="inspo-modal-img-template">
      <div class="img"><img src="" alt=""></div>
    </template>

    <!-- repeat template - cat -->
    <template id="inspo-modal-category-template">
      <li class="tag-item f-inter-B"><a href=""></a></li>
    </template>

    <!-- repeat template - link -->
    <template id="inspo-modal-link-template">
      <li class="related_article">
        <a class="related_article-inner" href="#">
          <div class="related_article-icon"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-arrow-box.svg"></div>
          <div class="related_article-text f-inter-B">
            <p></p>
          </div>
          <p class="related_article-genre f-inter-M">(projects)</p>
        </a>
      </li>
    </template>