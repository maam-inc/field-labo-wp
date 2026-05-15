<?php get_header(); ?>
<div class="project" id="project">
  <div class="project__wrapper">
    <p class="project__title">PROJECT</p>

    <?php 
      // WordPressの現在の一覧情報を取得 ... max_num_pages などを参照するために必要
      global $wp_query;

      // REST APIへ渡す投稿タイプ名 ... /wp-json/.../?post_type=project の project 部分になる
      $post_type = 'project';

      // 現在のページ番号（1ページ目なら1,2ページ目なら2）
      $current_page = max(1, get_query_var('paged') ?: 1);
    ?>

    <!--
      LOAD MORE用の情報をJSへ渡す
      data-post-type → APIで取得する投稿タイプ
      data-current-page → 現在のページ番号
      data-per-page → 一度に取得する件数
      data-max-page → 最後のページ番号
    -->
    <div
      class="project__articles js-load-list"
      data-post-type="<?php echo esc_attr($post_type); ?>"
      data-current-page="<?php echo esc_attr($current_page); ?>"
      data-per-page="2"
      data-max-page="<?php echo esc_attr($wp_query->max_num_pages); ?>"
    >

      <?php if(have_posts()) : ?>

        <?php
          // WordPressループ
          // 一覧の記事を1件ずつ取り出す
        ?>
        <?php while(have_posts()) : the_post(); ?>

          <?php
            // 投稿タイプごとのカードテンプレートを読み込む
            // project → card-project.php
            // blog → card-blog.php
          ?>
          <?php get_template_part('template-parts/card', $post_type); ?>

        <?php endwhile; ?>

      <?php endif; ?>

    </div>

    <?php if($wp_query->max_num_pages > 1) : ?>
      <?php get_template_part('template-parts/loadmore')?>
    <?php endif; ?>

  </div>
</div>
<?php get_footer(); ?>