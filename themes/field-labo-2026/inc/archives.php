<?php

  // ------------------------------
  // アーカイブの表示件数を変更する
  // ------------------------------
  function archive_posts_per_page($query) {
    // 管理画面では実行しない
    if (is_admin()) return;
    // メインクエリ以外には影響させない
    if (!$query->is_main_query()) return;

    // project一覧の初期表示件数
    if ($query->is_post_type_archive('projects')) {
      $query->set('posts_per_page', 8);
      $query->set('orderby', [
        'date' => 'DESC',
        'ID' => 'DESC',
      ]);
    }

    // blog一覧の初期表示件数
    if ($query->is_post_type_archive('blog')) {
      $query->set('posts_per_page', 18);
      $query->set('orderby', [
        'date' => 'DESC',
        'ID' => 'DESC',
      ]);
    }

    if ($query->is_post_type_archive('faq')) {
      $query->set('posts_per_page', -1);
      $query->set('orderby', 'menu_order');
      $query->set('order', 'ASC');
    }

    if ($query->is_tax('categorie')) {
      $query->set('post_type', 'inspo');
      $query->set('posts_per_page', -1);
    }

    if ($query->is_tax('genre')) {
      $query->set('post_type', 'blog');
      $query->set('posts_per_page', -1);
    }
  }
  add_action('pre_get_posts', 'archive_posts_per_page');

?>
