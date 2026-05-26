<?php

  // ------------------------------
  // 管理画面調整用
  // ------------------------------
  add_action('acf/input/admin_enqueue_scripts', function () {
    wp_enqueue_style(
      'acf-admin-custom',
      get_template_directory_uri() . '/assets/css/acf-admin-custom.css',
      [],
      '1.0'
    );
  });

  function enqueue_dashboard_styles() {
    wp_enqueue_style( 'dashboard_styles', get_template_directory_uri() . '/assets/css/admin-custom.css' );
  }
  add_action( 'admin_print_styles-index.php', 'enqueue_dashboard_styles' );

  // ログイン時のロゴ
  function custom_login_logo() {
  ?>
    <style type="text/css">
      #login h1 a {
        display: block;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url(<?php echo get_template_directory_uri(); ?>/assets/images/logo.svg);
        background-position: center center;
        width: 300px;
        height: 90px;
      }
    </style>
  <?php
  }
  add_action( 'login_head', 'custom_login_logo' );
    function custom_login_logo_url() {
    return get_bloginfo( 'url' );
  }
  add_filter( 'login_headerurl', 'custom_login_logo_url' );

  // 左ナビ
  function remove_admin_menu() {
    if (!current_user_can('administrator')) {

      remove_menu_page( 'edit.php' );
      remove_menu_page( 'options-general.php' );
      remove_menu_page( 'edit-comments.php' );
      remove_menu_page( 'tools.php' );
      remove_menu_page( 'themes.php' );
      remove_menu_page( 'plugins.php' ); // プラグイン
      remove_menu_page( 'users.php' ); // ユーザー
      remove_menu_page( 'tools.php' ); // ツール
      remove_menu_page( 'options-general.php' ); // 設定
      remove_menu_page( 'edit.php?post_type=page' );
      
      remove_submenu_page( 'index.php', 'update-core.php' ); // 更新
    }
  }
  add_action('admin_menu', 'remove_admin_menu', 999);

  // ウィジェット系
  function remove_dashboard_widget() {
    remove_meta_box( 'dashboard_site_health', 'dashboard', 'normal' ); // サイトヘルスステータス
    remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' ); // 概要
    remove_meta_box( 'dashboard_activity', 'dashboard', 'normal' ); // アクティビティ
    remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' ); // クイックドラフト
    remove_meta_box( 'dashboard_primary', 'dashboard', 'side' ); // WordPress イベントとニュース
    remove_action( 'welcome_panel', 'wp_welcome_panel' ); // ウェルカムパネル
  }
  add_action( 'wp_dashboard_setup', 'remove_dashboard_widget' );

  function add_dashboard_widgets() {
    wp_add_dashboard_widget(
      'quick_action_dashboard_widget', // ウィジェットのスラッグ名
      '📝 MENU', // ウィジェットに表示するタイトル
      'dashboard_widget_function' // 実行する関数
    );
  }
  add_action( 'wp_dashboard_setup', 'add_dashboard_widgets' );

  function dashboard_widget_function() {
    ?>
    <p class="quick-action-label">
      TOPの編集
    </p>
    <ul class="quick-action">
      <li>
          <a href="<?php echo admin_url() . 'edit.php?post_type=top'; ?>" class="quick-action-button">
          TOPスライダー
        </a>
      </li>
      <li>
          <a href="<?php echo admin_url() . 'edit.php?post_type=inspo'; ?>" class="quick-action-button">
          Photo Gallery
        </a>
      </li>
    </ul>

    <p class="quick-action-label">
      記事を編集
    </p>
    <ul class="quick-action">
      <li>
          <a href="<?php echo admin_url() . 'edit.php?post_type=blog'; ?>" class="quick-action-button">
          Blog &amp; Note
        </a>
      </li>
      <li>
        <a href="<?php echo admin_url() . 'edit.php?post_type=projects'; ?>" class="quick-action-button">
          <!-- <span class="dashicons-before dashicons-admin-customizer"></span> -->
          Projects
        </a>
      </li>
    </ul>
    
    <p class="quick-action-label">
      FAQを編集
    </p>
    <ul class="quick-action">
      <li>
        <a href="<?php echo admin_url() . 'edit.php?post_type=faq'; ?>" class="quick-action-button">
          FAQ
        </a>
      </li>
    </ul>
    <?php
  }


  // ヘッダーメニュー
  function remove_admin_bar( $wp_admin_bar ) {
    // if (!current_user_can('administrator')) {}
    $wp_admin_bar->remove_menu( 'wp-logo' );
    $wp_admin_bar->remove_menu( 'comments' );

    $wp_admin_bar->remove_menu( 'new-post' );
    $wp_admin_bar->remove_menu( 'new-media' );
    $wp_admin_bar->remove_menu( 'new-page' );
  }
  add_action( 'admin_bar_menu', 'remove_admin_bar', 999 );

?>
