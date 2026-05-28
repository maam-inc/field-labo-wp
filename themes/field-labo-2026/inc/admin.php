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

  function field_labo_get_all_photos_term() {
    $term = get_term_by('slug', 'all-photos', 'categorie');

    if (!$term || is_wp_error($term)) {
      return null;
    }

    return $term;
  }

  // InspoからAllを消す
  // ブロックエディタのカテゴリ取得から除外
  add_filter('rest_categorie_query', function($args, $request) {
    $all_term = field_labo_get_all_photos_term();

    if ($all_term) {
      $args['exclude'] = array_merge(
        isset($args['exclude']) ? (array) $args['exclude'] : [],
        [$all_term->term_id]
      );
    }

    return $args;
  }, 10, 2);

  // クラシック側のカテゴリチェックリストから除外
  add_filter('wp_terms_checklist_args', function($args, $post_id) {
    if (($args['taxonomy'] ?? '') !== 'categorie') {
      return $args;
    }

    $post_type = $post_id ? get_post_type($post_id) : '';

    if ($post_type && $post_type !== 'inspo') {
      return $args;
    }

    $all_term = field_labo_get_all_photos_term();

    if ($all_term) {
      $args['exclude'] = array_merge(
        isset($args['exclude']) ? (array) $args['exclude'] : [],
        [$all_term->term_id]
      );
    }

    return $args;
  }, 10, 2);

  add_action('admin_enqueue_scripts', function($hook_suffix) {
    if (!in_array($hook_suffix, ['post.php', 'post-new.php'], true)) {
      return;
    }

    $screen = function_exists('get_current_screen') ? get_current_screen() : null;

    if (!$screen || $screen->post_type !== 'inspo') {
      return;
    }

    $all_term = field_labo_get_all_photos_term();

    if (!$all_term) {
      return;
    }

    wp_register_script(
      'field-labo-admin-inspo-categorie',
      false,
      ['wp-data', 'wp-dom-ready'],
      '1.0',
      true
    );
    wp_enqueue_script('field-labo-admin-inspo-categorie');
    wp_add_inline_script(
      'field-labo-admin-inspo-categorie',
      sprintf(
        'wp.domReady(function() {
          const termId = %d;
          const termName = %s;
          const taxonomy = "categorie";

          const removeTerm = function() {
            const editorSelect = wp.data.select("core/editor");
            const editorDispatch = wp.data.dispatch("core/editor");

            if (!editorSelect || !editorDispatch) return;

            const selectedTerms = editorSelect.getEditedPostAttribute(taxonomy);

            if (!Array.isArray(selectedTerms) || !selectedTerms.includes(termId)) return;

            editorDispatch.editPost({
              [taxonomy]: selectedTerms.filter(function(id) {
                return id !== termId;
              })
            });
          };

          const hideTerm = function() {
            document.querySelectorAll("#in-categorie-" + termId + ", #in-categorie-" + termId + "-2").forEach(function(element) {
              const item = element.closest("li") || element.parentElement;
              if (item) item.style.display = "none";
            });

            document.querySelectorAll(".components-checkbox-control__label").forEach(function(label) {
              if (label.textContent.trim() !== termName) return;

              const item = label.closest(".components-checkbox-control") || label.closest(".components-base-control") || label.parentElement;
              if (item) item.style.display = "none";
            });
          };

          removeTerm();
          hideTerm();

          wp.data.subscribe(removeTerm);

          const observer = new MutationObserver(hideTerm);
          observer.observe(document.body, {
            childList: true,
            subtree: true
          });
        });',
        (int) $all_term->term_id,
        wp_json_encode($all_term->name)
      )
    );
  });

?>
