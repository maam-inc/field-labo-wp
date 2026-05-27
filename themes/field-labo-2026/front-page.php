<?php get_header(); ?>
<?php
  $query = get_query_var('custom_query');
  if (!($query instanceof WP_Query)) {
    $paged = get_query_var('paged') ?: 1;

    $args = [
      'post_type' => ['top'],
      'paged' => $paged,
      'post_status' => 'publish',
    ];
    $query = new WP_Query($args);
  }
?>

      <div class="l-content top" id="top">
        <div class="l-content__wrapper">
          <main class="topMain" id="topMain">
            <div class="topMain__mv swiper js-mainSwiper">
              <div class="swiper-wrapper">
                <?php if ($query->have_posts()) : ?>
                  <?php while ($query->have_posts()) : $query->the_post(); ?>
                    <?php
                      $images = get_field('main-image');
                      $images = is_array($images) ? $images : [];
                      $img_pc = $images['image_pc'] ?? '';
                      $img_sp = $images['image_sp'] ?? $img_pc;
                      $img_src = $img_sp ?: $img_pc;
                      $permalink = get_field('main-url') ?: home_url('/');
                      $text = get_field('main-text') ?? '';
                    ?>
                    <div class="swiper-slide">
                      <a class="inner" href="<?php echo esc_url($permalink); ?>">
                        <div class="main_img">
                          <picture>
                            <?php if ($img_pc) : ?>
                              <source media="(min-width: 769px)" srcset="<?php echo esc_url($img_pc); ?>"/>
                            <?php endif; ?>
                            <?php if ($img_sp) : ?>
                              <source media="(max-width: 768px)" srcset="<?php echo esc_url($img_sp); ?>"/>
                            <?php endif; ?>
                            <?php if ($img_src) : ?>
                              <img src="<?php echo esc_url($img_src); ?>" alt=""/>
                            <?php endif; ?>
                          </picture>
                        </div>
                        <div class="text-wrapper">
                          <p class="title f-inter-B"><?php echo esc_html(the_title()); ?></p>
                          <?php if($text): ?>
                            <p class="main_summary f-noto-B"><?php echo esc_html($text); ?></p>
                          <?php endif; ?>
                        </div>
                      </a>
                    </div>
                  <?php endwhile; ?>
                <?php endif; ?>
                <?php wp_reset_postdata(); ?>
              </div>
              <div class="c-ctrl__prev swiper-button-prev topMain__mv--prev"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/common/icon-prev.svg" alt="prev"/></div>
              <div class="c-ctrl__next swiper-button-next topMain__mv--next"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/common/icon-next.svg" alt="next"/></div>
            </div>
          </main>

          <section class="topContents">
            <div class="topContents__wrapper"> 
              
              <div class="topContents__head">
                <h1 class="topContents__title f-inter-B">PHOTO GALLERY</h1>
                <div class="topContents__ctrl f-inter-B">
                  <div class="sort ctrl-item">
                    <p class="sort__item ctrl-item--name">sort :</p>
                    <select class="sort__lists js-category" name="categorie" required>
                      <option class="sort__list" value="all">All Photos</option>
                      <?php
                        $all_terms = get_terms([
                          'taxonomy' => 'categorie',
                          'hide_empty' => false,
                          'orderby' => 'name',
                          'order' => 'ASC',
                        ]);

                        if (!is_wp_error($all_terms)) {
                          foreach ($all_terms as $term) {
                            echo '<option class="sort__list" value="' . esc_attr($term->slug) . '">' . esc_html($term->name) . '</option>';
                          }
                        }
                      ?>
                    </select>
                    <div class="sort__toggle"></div>
                  </div>
                  <div class="order ctrl-item">
                    <p class="order__item ctrl-item--name">order :</p>
                    <div class="order__ctrl">
                      <button class="order__ctrl-random order__ctrl-name js-sortBtn is-active" type="button" data-sort="random">random</button>
                      <button class="order__ctrl-latest order__ctrl-name js-sortBtn" type="button" data-sort="latest">latest</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ▼▼ TEMPLATE ▼▼ -->
              <template id="inspo-template">
                <div class="topContents__item l-contents__item js-galleryItem">
                  <div class="btn-wrap">
                    <button class="btn btn-open js-modalOpen" type="button" data-id="inspoModal" data-post="">
                      <div class="inner">
                        <div class="c-thumbnail topContents__gallery-item l-contents__gallery-item">
                          <div class="c-thumbnail__main_img">
                            <picture>
                              <source srcset="" type="image/webp">
                              <img src="" alt=""/>
                            </picture>
                          </div>
                          <div class="c-thumbnail__text-wrapper">
                            <p class="c-thumbnail__title f-noto-B"></p>
                            <div class="c-thumbnail__open">
                              <div class="c-modalOpenIcon"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </template>
              <!-- ▲▲ TEMPLATE ▲▲ -->

              <div class="topContents__gallery l-contents__gallery">
                <div class="masonry topContents__gallery-wrapper l-contents__gallery-wrapper js-masonry">
                  <div class="gutter-sizer"></div>
                </div>
              </div>

              <?php get_template_part('template-parts/loadmore'); ?>


              <div class="topContents__ctrl f-inter-B topContents__ctrl--fixed">
                <div class="sort ctrl-item">
                  <p class="sort__item ctrl-item--name">sort :</p>
                  <select class="sort__lists js-category" name="categorie" required>
                    <option class="sort__list" value="all">All Photos</option>
                    <?php
                      $all_terms = get_terms([
                        'taxonomy' => 'categorie',
                        'hide_empty' => false,
                        'orderby' => 'name',
                        'order' => 'ASC',
                      ]);

                      if (!is_wp_error($all_terms)) {
                        foreach ($all_terms as $term) {
                          echo '<option class="sort__list" value="' . esc_attr($term->slug) . '">' . esc_html($term->name) . '</option>';
                        }
                      }
                    ?>
                  </select>
                  <div class="sort__toggle"></div>
                </div>
                <div class="order ctrl-item">
                  <p class="order__item ctrl-item--name">order :</p>
                  <div class="order__ctrl">
                    <button class="order__ctrl-random order__ctrl-name js-sortBtn is-active" type="button" data-sort="random">random</button>
                    <button class="order__ctrl-latest order__ctrl-name js-sortBtn" type="button" data-sort="latest">latest</button>
                  </div>
                </div>
              </div>


              <?php
                get_template_part('template-parts/modal-frame', null, [
                  'modal_id' => 'inspoModal',
                  'content_class' => 'inspoModal',
                  // 'is_hidden' => true,
                ]);
                get_template_part('template-parts/modal-inspo');
              ?>
            </div>
          </section>
        </div>
      </div>

<?php get_footer(); ?>
