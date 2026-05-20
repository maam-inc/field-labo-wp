<?php

  // ------------------------------
  // JS,CSS用ロジック
  // ------------------------------
  function get_asset_type() {
    if (is_front_page()) return 'top';
    if (is_page('about-contact')) return 'page';
    if (is_singular()) return 'post';
    if (is_post_type_archive('faq')) return 'page';
    if (is_post_type_archive() || is_tax() || is_category() || is_tag() || is_archive()) return 'list';

    return 'page';
  }

  add_action('wp_enqueue_scripts', function() {
    $theme_uri = get_template_directory_uri();
    $theme_dir = get_template_directory();
    $asset_type = get_asset_type();

    wp_enqueue_style(
      'field-labo-fonts',
      'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+JP:wght@100..900&display=swap',
      [],
      null
    );

    wp_enqueue_style(
      'field-labo-common',
      $theme_uri . '/assets/css/common.css',
      [],
      file_exists($theme_dir . '/assets/css/common.css') ? filemtime($theme_dir . '/assets/css/common.css') : null
    );

    wp_enqueue_style(
      'field-labo-' . $asset_type,
      $theme_uri . '/assets/css/' . $asset_type . '.css',
      ['field-labo-common'],
      file_exists($theme_dir . '/assets/css/' . $asset_type . '.css') ? filemtime($theme_dir . '/assets/css/' . $asset_type . '.css') : null
    );

    wp_enqueue_script(
      'field-labo-common',
      $theme_uri . '/assets/js/common.js',
      [],
      file_exists($theme_dir . '/assets/js/common.js') ? filemtime($theme_dir . '/assets/js/common.js') : null,
      true
    );

    wp_enqueue_script(
      'field-labo-' . $asset_type,
      $theme_uri . '/assets/js/' . $asset_type . '.js',
      ['field-labo-common'],
      file_exists($theme_dir . '/assets/js/' . $asset_type . '.js') ? filemtime($theme_dir . '/assets/js/' . $asset_type . '.js') : null,
      true
    );
  });

?>
