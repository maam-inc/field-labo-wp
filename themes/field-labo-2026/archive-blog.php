<?php get_header(); ?>
<div class="blog l-content" id="blog">
  <div class="l-content__wrapper">
    <div class="c-breadcrumbs">
      <div class="c-breadcrumbs__item">
        <h1 class="c-breadcrumbs__page f-inter-B">BLOG &amp; NOTE</h1>
      </div>
    </div>

    <div class="blog__gallery">
      <?php 
        global $wp_query;
        $post_type = 'blog';
        $current_page = max(1, get_query_var('paged') ?: 1);
      ?>
      <div
        class="blog__gallery-wrapper js-load-list"
        data-post-type="<?php echo esc_attr($post_type); ?>"
        data-current-page="<?php echo esc_attr($current_page); ?>"
        data-per-page="2"
        data-max-page="<?php echo esc_attr($wp_query->max_num_pages); ?>"
      >
        <?php if(have_posts()) : ?>
          <?php while(have_posts()) : the_post(); ?>
            <?php get_template_part('template-parts/card', $post_type); ?>
          <?php endwhile; ?>
        <?php endif; ?>
      </div>
    </div>
    <?php if($wp_query->max_num_pages > 1) : ?>
      <?php get_template_part('template-parts/loadmore')?>
    <?php endif; ?>
  </div>
</div>
<?php get_footer(); ?>
