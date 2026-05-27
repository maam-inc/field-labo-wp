    <!-- TEMPLATE インナー -->
    <template id="inspo-modal-template">
      <div class="topContents__modal">
        <div class="topContents__modal-imgs js-images">
          <!-- #inspo-modal-img-template -->
        </div>
        <p class="text js-text f-noto-M"><!-- ここにキャプション --></p>
        <div class="topContents__flex">

          <!-- 関連記事 -->
          <div class="related_articles topContents__flex-item js-articleContainer">
            <p class="related_articles-head topContents__flex-head f-inter-B">related article</p>
            <ul class="related_articles-wrapper js-articleWrapper">
              <!-- #inspo-modal-article-template -->
            </ul>
          </div>

          <!-- タグ -->
          <div class="tag f-inter-B topContents__flex-item js-tagContainer">
            <p class="tag-head topContents__flex-head">tag</p>
            <ul class="tag-wrapper js-tagWrapper">
              <!-- #inspo-modal-tag-template -->
            </ul>
          </div>
        </div>

        <!-- <div class="inspo-layout inspo-layout--main">
          <ul class="categorie_wrapper"></ul>
          <div class="links-wrapper" hidden></div>
        </div> -->
      </div>
    </template>


    <!-- repeat template - img -->
    <template id="inspo-modal-img-template">
      <div class="topContents__modal-img">
        <picture>
          <source srcset="" type="image/webp">
          <img src="" alt="">
        </picture>
      </div>
    </template>

    <!-- repeat template - タグ -->
    <template id="inspo-modal-tag-template">
      <li class="tag-item f-inter-B"><a href=""></a></li>
    </template>

    <!-- repeat template - 関連記事 -->
    <template id="inspo-modal-article-template">
      <li class="related_article">
        <a class="related_article-inner" href="" target="_blank">
          <div class="related_article-icon"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/common/icon-arrow-box.svg" alt=""></div>
          <div class="related_article-text f-inter-B">
            <p></p>
          </div>
          <p class="related_article-genre f-inter-M"></p>
        </a>
      </li>
    </template>
