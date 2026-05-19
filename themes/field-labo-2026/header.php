<!DOCTYPE html>
<html lang="ja">
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require get_template_directory() . '/inc/meta-data.php'; ?>
    <title><?php echo esc_html($output_title); ?>
  </title>
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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet">
    <?php wp_head();?>
  </head>
  <body>
    <div class="wrapper" id="wrapper">
        
        <!-- Header -->
        <header class="l-header" id="l-header">
          <div class="l-header__inner">
            <a class="l-header__logo" href="<?php echo home_url(); ?>">
              <h1>
                <div class="c-logo white"></div>
              </h1>
            </a>
            <nav class="l-header__nav f-inter-B">
              <a class="l-header__nav-list" href="<?php echo home_url('blog'); ?>">BLOG & NOTE</a>
              <a class="l-header__nav-list" href="<?php echo home_url('projects'); ?>">PROJECTS</a>
              <a class="l-header__nav-list" href="<?php echo home_url('about'); ?>">ABOUT & CONTACT</a>
            </nav>
            <button class="l-header__menu">
              <div class="l-header__menu-inner">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
              </div>
            </button>
          </div>
        </header>
        
        <!-- Humburger -->
        <div class="l-header__modal">
          <div class="l-header__modal-bg"></div>
          <div class="l-header__modal-container">
            <div class="l-header__modal-inner">
              <a class="l-header__modal-top" href="<?php echo home_url(); ?>">
                <div class="l-header__modal-top-arrow">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-arrow-r.svg" alt="">
                </div>
                <p class="l-header__modal-top-text f-inter-B">top</p>
              </a>
              <button class="l-header__modal-btn">
                <div class="btn-close"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-close.svg" alt="close"></div>
              </button>
              <div class="l-header__modal-logo">
                <div class="c-logo black"></div>
              </div>
              <nav class="l-header__modal-nav">
                <a class="f-inter-B" href="<?php echo home_url('blog'); ?>">BLOG & NOTE</a>
                <a class="f-inter-B" href="<?php echo home_url('projects'); ?>">PROJECTS</a>
                <a class="f-inter-B" href="<?php echo home_url('about'); ?>">ABOUT & CONTACT</a>
              </nav>
              <ul class="c-sns l-header__modal-sns">
                <li>
                  <a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-instagram.svg" alt="instagram"/></a>
                </li>
                <li>
                  <a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-facebook.svg" alt="facebook"/></a>
                </li>
                <li>
                  <a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-pinterest.svg" alt="pinterest"/></a>
                </li>
                <li>
                  <a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-home.svg" alt="home"/></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
