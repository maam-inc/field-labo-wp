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

      <div class="l-content">
        <div class="l-content__wrapper">
          <main class="topMain" id="topMain">
            <div class="topMain__mv swiper js-mainSwiper">
              <div class="swiper-wrapper">
                <?php if ($query->have_posts()) : ?>
                  <?php while ($query->have_posts()) : $query->the_post(); ?>
                    <?php
                      $img_pc = get_field('image_pc');
                      $img_sp = get_field('image_sp');
                      $get_url = get_field('post');
                      $permalink = '#';

                      if (is_object($get_url) && isset($get_url->ID)) {
                        $permalink = get_permalink($get_url->ID);
                      } elseif (is_numeric($get_url)) {
                        $permalink = get_permalink((int) $get_url);
                      }
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
                            <img src="<?php echo esc_url($img_sp ?: $img_pc); ?>" alt=""/>
                          </picture>
                        </div>
                        <div class="text-wrapper">
                          <div class="title f-inter-B">
                            <p><?php echo esc_html(get_field('title')); ?></p>
                          </div>
                          <div class="main_summary f-noto-B">
                            <p><?php echo esc_html(get_field('text')); ?></p>
                          </div>
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

          <section class="l-contents topContents is-show" id="l-contents">
            <div class="l-contents__wrapper">
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

              <template id="inspo-template">
                <div class="topContents__item l-contents__item js-galleryItem">
                  <div class="btn-wrap">
                    <button class="btn btn-open js-modalOpen" type="button" data-id="inspoModal" data-post="">
                      <div class="inner">
                        <div class="c-thumbnail topContents__gallery-item l-contents__gallery-item">
                          <div class="c-thumbnail__main_img"><img src="" alt=""/></div>
                          <div class="c-thumbnail__text-wrapper">
                            <div class="c-thumbnail__title f-inter-B">
                              <p></p>
                            </div>
                            <div class="c-thumbnail__open">
                              <div class="l-modalOpenIcon c-modalOpenIcon"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </template>

              <div class="topContents__gallery l-contents__gallery">
                <div class="masonry topContents__gallery-wrapper l-contents__gallery-wrapper js-masonry">
                  <div class="gutter-sizer"></div>
                </div>
              </div>

              <?php get_template_part('template-parts/loadmore'); ?>

              <?php
                get_template_part('template-parts/modal-frame', null, [
                  'modal_id' => 'inspoModal',
                  'content_class' => 'inspoModal',
                  'is_hidden' => true,
                ]);
                get_template_part('template-parts/modal-inspo');
              ?>

              <div class="topContents__toTop l-contents__toTop">
                <div class="c-toTop">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.595 33.595">
                    <rect class="cls-2" width="33.595" height="33.595"/>
                    <polygon class="cls-1" points="21.774 18.725 16.797 13.749 11.821 18.724 10.835 17.738 16.797 11.775 22.76 17.737 21.774 18.725"/>
                    <rect class="cls-1" x="16.099" y="12.762" width="1.396" height="10.938"/>
                    <rect class="cls-1" x="10.987" y="9.196" width="11.62" height="1.396"/>
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

<?php get_footer(); ?>
