<?php get_header(); ?>
<?php
  $query = get_query_var('custom_query');
  if(!($query instanceof WP_Query)){
    $paged = get_query_var('paged') ?: 1;

    $args = [
      'post_type' => ['top'],
      // 'posts_per_page' => 5,
      'paged' => $paged,
      'meta_query' => array(
        array(
          // 'key' => 'slider',
          // 'value' => '1',
          // 'compare' => '=',
        ),
      ),
    ];
    $query = new WP_Query($args);
  }
?>


        <div class="l-content">
          <div class="l-content__wrapper">


            <!-- ******** Main ******** -->
            <main class="topMain" id="topMain">
              <div class="topMain__mv swiper js-mainSwiper"> 
                <div class="swiper-wrapper"> 
                  <?php if($query->have_posts()): ?>
                  <?php while($query->have_posts()): $query->the_post(); ?> 
                  <div class="swiper-slide">
                    <?php
                      $img_pc = get_field('image_pc');
                      $img_sp = get_field('image_sp');
                      $get_url = get_field('post');
                      $permalink = '#';
                      if (is_object($get_url) && isset($get_url->ID)) {
                        $permalink = get_permalink($get_url->ID);
                      } elseif (is_numeric($get_url)) {
                        $permalink = get_permalink((int)$get_url);
                      }
                    ?>
                    <a class="inner" href="<?php echo esc_url($permalink); ?>">
                      <div class="main_img">
                        <picture>
                          <source media="(min-width: 769px)" srcset="<?php echo esc_url($img_pc); ?>"/>
                          <img src="<?php echo esc_url($img_sp); ?>" alt=""/>
                        </picture>
                      </div>
                      <div class="text-wrapper"> 
                        <div class="title f-inter-B">
                          <p><?php echo get_field('title');?></p>
                        </div>
                        <div class="main_summary f-noto-B">
                          <p><?php echo get_field('text');?></p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <?php endwhile; ?>
                  <?php endif; ?>
                </div>
                <div class="c-ctrl__prev swiper-button-prev topMain__mv--prev"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-prev.svg" alt="prev"/></div>
                <div class="c-ctrl__next swiper-button-next topMain__mv--next"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-next.svg" alt="next"/></div>
              </div>
            </main>



            <section class="l-contents topContents is-show" id="l-contents"> 
              <div class="l-contents__wrapper"> 
                <div class="topContents__head">
                  <h1 class="topContents__title f-inter-B">PHOTO GALLERY</h1>
                  <div class="topContents__ctrl f-inter-B">
                    <div class="sort ctrl-item">
                      <p class="sort__item ctrl-item--name">sort :</p>
                      <select class="sort__lists js-category">
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
                    
                      <select class="sort__lists" name="categorie" required>
                        <option class="sort__list" value="all photos">All Photos</option>
                        <option class="sort__list" value="kitchen">Kitchen</option>
                        <option class="sort__list" value="living">Living</option>
                        <option class="sort__list" value="bathroom">Bathroom</option>
                        <option class="sort__list" value="washbasin">Washbasin</option>
                        <option class="sort__list" value="toilet">Toilet</option>
                        <option class="sort__list" value="entrance">Entrance</option>
                        <option class="sort__list" value="other">Other</option>
                        <option class="sort__list" value="lighting">Lighting</option>
                        <option class="sort__list" value="switch &amp; outlet">Switch &amp; Outlet</option>
                        <option class="sort__list" value="door &amp; window">Door &amp; Window</option>
                        <option class="sort__list" value="color &amp; pattern">Color &amp; Pattern</option>
                        <option class="sort__list" value="built-in">Built-in</option>
                        <option class="sort__list" value="diy">DIY</option>
                        <option class="sort__list" value="ikea">IKEA</option>
                        <option class="sort__list" value="hobby">Hobby</option>
                        <option class="sort__list" value="field">FIELD</option>
                      </select>
                      <div class="sort__toggle"></div>
                    </div>
                    <div class="order ctrl-item">
                      <p class="order__item ctrl-item--name">order :</p>
                      <div class="order__ctrl"> 
                        <btn class="order__ctrl-random order__ctrl-name is-active">random</btn>
                        <btn class="order__ctrl-latest order__ctrl-name">latest</btn>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="l-contents__gallery-ctrl f-inter-B">
                  <div class="sort ctrl-item">
                    <p class="sort__item ctrl-item--name">sort :</p>

                    <select class="sort__lists js-category">
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


                <!-- ******** Inspo ******** -->
                <?php
                  $paged = get_query_var('paged') ?: 1;

                  $args = [
                    'post_type' => ['inspo'],
                    'posts_per_page' => 5,
                    'paged' => $paged,
                  ];          
                ?>
                <?php $query = new WP_Query($args);?>   

                <!-- TEMPLATEここから -->
                <template id="inspo-template">
                  <div class="l-contents__item js-galleryItem">
                    <div class="btn-wrap">
                      <button class="btn js-modalOpen" data-id="inspoModal" data-post="">
                        <div class="inner">
                          <div class="c-thumbnail l-contents__gallery-item">
                            <div class="c-thumbnail__main_img">
                              <img src=""/>
                            </div>
                            <div class="c-thumbnail__text-wrapper">
                              <div class="c-thumbnail__title f-inter-B">
                                <p></p>
                              </div>
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
                <!-- TEMPLATEここまで -->

                <div class="l-contents__gallery">
                  <div class="js-masonry l-contents__gallery-wrapper">
                    <div class="gutter-sizer"></div>
                  </div>
                </div>

                <?php get_template_part('template-parts/loadmore')?>

                <!-- MODALの読み込み -->
                <?php
                  get_template_part('template-parts/modal-frame', null, [
                    'modal_id' => 'inspoModal',
                    'content_class' => 'inspoModal',
                    'is_hidden' => true,
                  ]);
                  get_template_part('template-parts/modal-inspo');
                ?>


                <div class="l-contents__toTop">
                  <div class="c-toTop">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.595 33.595"><rect class="cls-2" width="33.595" height="33.595"/><polygon class="cls-1" points="21.774 18.725 16.797 13.749 11.821 18.724 10.835 17.738 16.797 11.775 22.76 17.737 21.774 18.725"/><rect class="cls-1" x="16.099" y="12.762" width="1.396" height="10.938"/><rect class="cls-1" x="10.987" y="9.196" width="11.62" height="1.396"/></svg>
                  </div>
                </div>

              </div>
                  </section>
          </div>
        </div>

        <?php get_footer(); ?>
