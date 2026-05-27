<!DOCTYPE html>
<html lang="ja">
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="google-site-verification" content="hd3JBvPgqDhIZvCyZqtMcokLNrIx6za0-nVhSFKaspI" />
    <meta name="p:domain_verify" content="6ae4222cac44be1ee392005051150c5f" />

    <!-- META -->
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

    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.ico" sizes="32x32">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/apple-touch-icon.png">


    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-GFJ09MTPQS"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}

      gtag('js', new Date());
      gtag('config', 'G-GFJ09MTPQS');
    </script>


    <?php wp_head();?>
  </head>
  <body<?php echo is_front_page() ? ' id="top"' : ''; ?>>
    <div class="wrapper" id="wrapper">
        
        <!-- Header -->
        <header class="l-header">
          <div class="l-header__inner">
            <a class="l-header__logo" href="<?php echo esc_url(home_url('/')); ?>">
              <?php if (is_front_page()) : ?>
                <!-- <h1 class="l-header__site-title"> -->
                <h1>
                  <span class="c-logo white"></span>
                  <span class="c-logo white" aria-label="FIELD LABO"></span>
                </h1>
              <?php else : ?>
                <p class="l-header__site-title">
                  <span class="c-logo white" aria-label="FIELD LABO"></span>
                </p>
              <?php endif; ?>
            </a>
            <nav class="c-nav f-inter-B">
              <a class="c-nav__list <?php echo is_post_type_archive('blog') || is_singular('blog') ? 'is-current' : '' ?>" href="<?php echo esc_url(home_url('blog')); ?>">BLOG & NOTE</a>
              <a class="c-nav__list <?php echo is_post_type_archive('projects') || is_singular('projects') ? 'is-current' : '' ?>" href="<?php echo esc_url(home_url('projects')); ?>">PROJECTS</a>
              <a class="c-nav__list <?php echo is_page('about-contact') || is_post_type_archive('faq') ? 'is-current' : '' ?>" href="<?php echo esc_url(home_url('about-contact')); ?>">ABOUT & CONTACT</a>
            </nav>
          </div>
        </header>

        
        <!-- 固定 HEADER -->
        <header class="l-headerFixed">
          <div class="l-headerFixed__inner">
            <a class="l-headerFixed__logo" href="<?php echo esc_url(home_url('/')); ?>">
              <span>
                <span class="c-logo white" aria-label="FIELD LABO"></span>
              </span>
            </a>
            <nav class="c-nav f-inter-B">
              <a class="c-nav__list <?php echo is_post_type_archive('blog') || is_singular('blog') ? 'is-current' : '' ?>" href="<?php echo esc_url(home_url('blog')); ?>">BLOG & NOTE</a>
              <a class="c-nav__list <?php echo is_post_type_archive('projects') || is_singular('projects') ? 'is-current' : '' ?>" href="<?php echo esc_url(home_url('projects')); ?>">PROJECTS</a>
              <a class="c-nav__list <?php echo is_page('about-contact') || is_post_type_archive('faq') ? 'is-current' : '' ?>" href="<?php echo esc_url(home_url('about-contact')); ?>">ABOUT & CONTACT</a>
            </nav>
            <button class="l-headerFixed__menu">
              <div class="l-headerFixed__menu-inner">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
              </div>
            </button>
          </div>
        </header>
        
        <!-- Humburger -->
        <div class="l-header__modal">
          <div class="l-header__modal-bg l-header__modal-close"></div>
          <div class="l-header__modal-container">
            <div class="l-header__modal-inner">
              <a class="l-header__modal-top" href="<?php echo esc_url(home_url('/')); ?>">
                <div class="l-header__modal-top-arrow">
                  <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/common/icon-arrow-r.svg" alt="">
                </div>
                <p class="l-header__modal-top-text f-inter-B">top</p>
              </a>
              <button class="l-header__modal-btn l-header__modal-close">
                <div class="btn-close"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/common/icon-close.svg" alt="close"></div>
              </button>
              <div class="l-header__modal-logo">
                <div class="c-logo black"></div>
              </div>
              <a class="l-header__modal-logo" href="<?php echo esc_url(home_url('/')); ?>">
                <span class="c-logo black" aria-label="FIELD LABO"></span>
              </a>
              <nav class="c-nav f-inter-B">
                <a class="c-nav__list" href="<?php echo esc_url(home_url('blog')); ?>">BLOG & NOTE</a>
                <a class="c-nav__list" href="<?php echo esc_url(home_url('projects')); ?>">PROJECTS</a>
                <a class="c-nav__list" href="<?php echo esc_url(home_url('about-contact')); ?>">ABOUT & CONTACT</a>
              </nav>
              <ul class="c-sns">
                <li>
                  <a href="https://www.instagram.com/field_labo/" target="_blank"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/common/icon-instagram.svg" alt="instagram"/></a>
                </li>
                <li>
                  <a href="https://www.facebook.com/fieldlabo/" target="_blank"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/common/icon-facebook.svg" alt="facebook"/></a>
                </li>
                <li>
                  <a href="https://jp.pinterest.com/field_labo/" target="_blank"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/common/icon-pinterest.svg" alt="pinterest"/></a>
                </li>
                <li>
                  <a href="https://www.houzz.jp/pro/field-labo" target="_blank"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/common/icon-home.svg" alt="houzz"/></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
