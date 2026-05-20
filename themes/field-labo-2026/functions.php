<?php

  // ------------------------------
  // テーマサポート追加
  // ------------------------------
  add_action('after_setup_theme', function() {
    add_theme_support('html5', [
      'style',
      'script',
    ]);
  });

  require_once get_template_directory() . '/inc/admin.php';
  require_once get_template_directory() . '/inc/acf.php';
  require_once get_template_directory() . '/inc/post-types.php';
  require_once get_template_directory() . '/inc/assets.php';
  require_once get_template_directory() . '/inc/archives.php';
  require_once get_template_directory() . '/inc/excerpts.php';
  require_once get_template_directory() . '/inc/save-post.php';
  require_once get_template_directory() . '/inc/rest-api.php';
  require_once get_template_directory() . '/inc/block-parts.php';

?>
