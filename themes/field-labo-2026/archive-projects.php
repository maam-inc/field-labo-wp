<?php get_header(); ?>
<div class="projects l-content" id="projects">
  <div class="l-content__wrapper">
    <div class="c-breadcrumbs">
      <div class="c-breadcrumbs__item">
        <h1 class="c-breadcrumbs__page f-inter-B">PROJECTS</h1>
      </div>
    </div>

    <div class="projects__gallery">
      <?php 
        // WordPressの現在の一覧情報を取得 ... max_num_pages などを参照するために必要
        global $wp_query;
        // REST APIへ渡す投稿タイプ名 ... /wp-json/.../?post_type=project の project 部分になる
        $post_type = 'projects';
        // $post_type = 'project';
        // 現在のページ番号（1ページ目なら1,2ページ目なら2）
        $current_page = max(1, get_query_var('paged') ?: 1);
      ?>
      <div
        class="projects__gallery-wrapper js-load-list"
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