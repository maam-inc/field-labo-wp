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
      ?>
      <select class="categorie_wrapper"> 
        <option value="all">ALL</option>
        <?php
          foreach ($all_terms as $term) {
            echo '<option value="' . esc_attr($term->slug) . '">' . esc_html($term->name) . '</option>';
          }
        ?>
      </select>
      <div class="sort_wrapper" aria-label="並び替え">
        <button class="sort_btn jsSortBtn is-active" type="button" data-sort="random">RANDOM</button>
        <button class="sort_btn jsSortBtn" type="button" data-sort="latest">LATEST</button>
      </div>
    </div>
    <!-- ===================== ===================== -->
                      <!-- ① INSPO -->
    <!-- ===================== ===================== -->      
    <?php
      $paged = get_query_var('paged') ?: 1;

      $args = [
        'post_type' => ['inspo'],
        'posts_per_page' => 5,
        'paged' => $paged,
        // 'orderby' => 'rand',
      ];          
    ?>
    <?php $query = new WP_Query($args);?>        
    <div class="contents__inspos jsLoadMoreWrapper">
      <!-- TEMPLATE -->
      <template id="inspo-template">
        <div class="contents__inspo">
          <button  class="btn js-modalOpen" data-id="inspoModal" data-post="">
            <div class="inner">
              <div class="main_img">
                <img src="" loading="lazy"/>
              </div>
              <p class="ttl"></p>
            </div>
          </button>
        </div>
      </template>
      <div class="jsLoadMoreContainer masonry">
        <div class="gutter-sizer"></div>
      </div>
    </div>
    
    <?php get_template_part('template-parts/loadmore')?>
    
  </div>
</div>
<?php get_footer(); ?>