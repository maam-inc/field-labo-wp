<?php get_header(); ?>
        <?php
          $query = get_query_var('custom_query');
          if(!($query instanceof WP_Query)){
            $paged = get_query_var('paged') ?: 1;

            $args = [
              'post_type' => ['top'],
              'posts_per_page' => -1,
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
        <div class="main" id="main">
          <div class="main__wrapper">
            <div class="swiper-container">
              <div class="main__mv swiper"> 
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
                          <img src="<?php echo esc_url($img_sp); ?>" role="presentation"/>
                        </picture>
                      </div>
                      <div class="text-wrapper"> 
                        <p class="title"><?php echo get_field('title');?></p>
                        <p class="main_summary"><?php echo get_field('text');?></p>
                      </div>
                    </a>
                  </div>
                  <?php endwhile; ?>
                  <?php endif; ?>
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </div>
        <div class="contents" id="contents">
          <div class="contents__wrapper"> 
            <div class="contents__nav">
              <a href="<?php echo get_post_type_archive_link('project'); ?>">Project</a>
              <a href="<?php echo get_post_type_archive_link('note'); ?>">Note</a>
              <a href="<?php echo get_post_type_archive_link('faq'); ?>">FAQ</a>
              <a href="<?php echo get_page_link(314);?>">ABOUT</a>
            </div>
            <div class="categorie_container">
              <?php
                $all_terms = get_terms([
                  'taxonomy' => 'categorie',
                  'hide_empty' => false,
                  'orderby' => 'name',
                  'order' => 'ASC',
                ]);
                $current_term = get_queried_object();
                $current_slug = $current_term->slug;
              ?>
              <select class="categorie_wrapper" onchange="if(this.value) location.href=this.value;" name="categorie"> 
                <option value="<?php echo home_url(); ?>">ALL</option>
                <?php
                  foreach ($all_terms as $term) {
                    if($term->parent)
                      echo '<option value="' . esc_url(get_term_link($term)) . '?view=top" ' . ($current_slug === $term->slug ? 'selected' : '') . '>' . esc_html($term->name) . '</option>';
                  }
                ?>
              </select>
            </div>
            <!-- ===================== ===================== -->
                              <!-- ① INSPO -->
            <!-- ===================== ===================== -->      
            <?php
              $paged = get_query_var('paged') ?: 1;
              $term_object = get_queried_object();
              $term_slug = $term_object->slug;
              $args = [
                'post_type' => 'inspo',
                'posts_per_page' => -1,
                'paged' => $paged,
                // 'orderby' => 'rand',
                'taxonomy' => 'categorie',
                'term' => $term_slug
              ];          
            ?>
            <?php $query = new WP_Query($args);?>        
            <div class="contents__inspos jsLoadMoreWrapper">
              <div class="jsLoadMoreContainer masonry">
                <div class="gutter-sizer"></div>
                <?php if($query->have_posts()): ?>
                  <?php while($query->have_posts()): $query->the_post(); ?>
                    <?php
                      $img = get_field('image');
                    ?>    
                    <div class="contents__inspo">
                      <button 
                        class="btn js-modalOpen"
                        data-id="inspoModal"
                        data-post="<?php the_ID(); ?>"
                      >
                        <div class="inner">
                          <div class="main_img">
                            <img src="<?php echo esc_url(get_field('image')); ?>" loading="lazy"/>
                          </div>
                        </div>
                      </button>
                    </div>
                    
                  <?php endwhile; ?>
                <?php endif; ?>    

                <?php wp_reset_postdata(); ?>
              </div>
            </div>
            <button class="contents__load jsLoadMoreBtn">
              <p>LOAD MORE</p>
            </button>
          </div>
        </div>
<?php get_footer(); ?>