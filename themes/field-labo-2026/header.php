<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require get_template_directory() . '/inc/meta-data.php'; ?>
    <title><?php echo esc_html($output_title); ?></title>
    <meta name="description" content="<?php echo esc_attr($description); ?>">
    <link rel="canonical" href="<?php echo esc_url($page_url); ?>">
    <meta property="og:title" content="<?php echo esc_attr($title); ?>">
    <meta property="og:site_name" content="<?php echo esc_attr(get_bloginfo('name')); ?>">
    <meta property="og:description" content="<?php echo esc_attr($description); ?>">
    <meta property="og:url" content="<?php echo esc_url($page_url); ?>">
    <meta property="og:type" content="<?php echo esc_attr($page_type); ?>">
    <meta property="og:image" content="<?php echo esc_url($ogp_img); ?>">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo esc_attr($title); ?>">
    <meta name="twitter:description" content="<?php echo esc_attr($description); ?>">
    <meta name="twitter:image" content="<?php echo esc_url($ogp_img); ?>">
    <link href="<?php echo get_template_directory_uri(); ?>/assets/css/common.css" rel="stylesheet" type="text/css">
    <?php
      $asset_type = function_exists('get_asset_type') ? get_asset_type() : 'page';
    ?>
    <link href="<?php echo get_template_directory_uri(); ?>/assets/css/<?php echo esc_attr($asset_type)?>.css" rel="stylesheet" type="text/css">
    <?php wp_head();?>
  </head>
  <body>
    <div class="wrapper" id="wrapper">
      <div class="modalOpenBg">
        <header class="header" id="header">
          <div class="btn-wrap hbg-menu__btn">
            <button class="btn js-modalOpen" data-id="hbgModal">
              <div class="inner">
                <p>ボタン </p>
              </div>
            </button>
          </div>
          <a href="<?php echo home_url(); ?>">
              <h1>FIELD LABO</h1>
          </a>
        </header>
