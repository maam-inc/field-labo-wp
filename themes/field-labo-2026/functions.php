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


  // ------------------------------
  // ACFパーツのカスタム
  // ------------------------------
  // リンクのみのウィジウィグエディタ作成
  add_filter('acf/fields/wysiwyg/toolbars', function($toolbars) {
    $toolbars['Link Only'] = [];
    $toolbars['Link Only'][1] = ['link','unlink'];

    return $toolbars;
  });

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
      $query->set('posts_per_page', 2);
      $query->set('orderby', [
        'date' => 'DESC',
        'ID' => 'DESC',
      ]);
    }

    // blog一覧の初期表示件数
    if ($query->is_post_type_archive('blog')) {
      $query->set('posts_per_page', 4);
      $query->set('orderby', [
        'date' => 'DESC',
        'ID' => 'DESC',
      ]);
    }
  }
  add_action('pre_get_posts', 'archive_posts_per_page');




  // ------------------------------
  // カスタム投稿タイプ登録
  // ------------------------------
  function create_post_type() {
    // SAMPLE
    // **********
    // register_post_type('inspo', [
    //   'label' => 'FAQ',
    //   'public' => true,
    //   'publicly_queryable' => true,
    //   'show_ui' => true,
    //   'show_in_nav_menus' => true,
    //   'show_in_menu' => true,
    //   'show_in_rest' => true,

    //   'has_archive' => true,
    //   'exclude_from_search' => false,
    //   'capability_type' => 'post',
    //   'hierarchical' => false,
    //   'can_export' => false,

    //   'rewrite' => [
    //     'slug' => 'faq',
    //     'with_front' => true,
    //   ],

    //   'query_var' => true,
    //   'supports' => ['title'],
    //   'taxonomies' => ['categorie'],
    // ]);


    // TOP用
    // **********
    register_post_type('top', [
      'label' => '[TOP]スライダー',
      'public' => true,
      'publicly_queryable' => false,
      'exclude_from_search' => true,
      'show_in_rest' => true,
      'has_archive' => false,
      'rewrite' => false,
      'supports' => ['title'],
    ]);
    
    register_post_type('inspo', [
      'label' => '[TOP]Photo Gallery',
      'public' => true,
      'show_in_rest' => true,
      'has_archive' => false,
      'rewrite' => [
        'slug' => 'inspo',
      ],
      'supports' => ['title'],
      'taxonomies' => ['categorie'],
    ]);

    register_taxonomy('categorie', ['inspo'], [
      'label' => 'カテゴリー',
      'public' => true,
      'hierarchical' => true,
      'show_ui' => true,
      'show_in_rest' => true,
      'show_admin_column' => false,
      'rewrite' => false,
    ]);


    // 投稿
    // **********
    register_post_type('projects', [
      'label' => 'Projects',
      'public' => true,
      'show_in_rest' => true,
      'has_archive' => 'projects',
      'rewrite' => [
        'slug' => 'projects',
      ],
      'query_var' => 'projects',
      'supports' => ['title', 'editor'],
      // 'supports' => ['title'],
    ]);
    
    register_post_type('blog', [
      'label' => 'Blog & Note',
      'public' => true,
      'show_in_rest' => true,
      'has_archive' => true,
      'rewrite' => [
        'slug' => 'blog',
      ],
      'supports' => ['title', 'editor'],
      // 'supports' => ['title'],
    ]);

    // FAQ
    // **********
    register_post_type('faq', [
      'label' => 'FAQ',
      'public' => true,
      'show_in_rest' => true,
      'has_archive' => true,
      'rewrite' => [
        'slug' => 'faq',
      ],
      'supports' => ['title', 'page-attributes', ],
    ]);
  }

  add_action('init', 'create_post_type');

  add_action('init', function() {
    $rewrite_version = '20260519_projects_blog_cpt';

    if (get_option('field_labo_rewrite_version') !== $rewrite_version) {
      flush_rewrite_rules(false);
      update_option('field_labo_rewrite_version', $rewrite_version);
    }
  }, 20);

  // カテゴリ　NOTEとTOPの出し分け
  // function add_custom_query_vars($vars){
  //   $vars[] = 'view';
  //   return $vars;
  // }
  // add_filter('query_vars', 'add_custom_query_vars');

  // JS,CSS用ロジック
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

  // カテゴリ　画像と投稿共通化
  // add_action('init', function() {
  //   register_taxonomy(
  //     'project_tag', // ← 名前変えた方がいい（後述）
  //     ['post', 'attachment', 'your_custom_post'],
  //     [
  //       'label' => 'カテゴリ',
  //       'hierarchical' => true, // ← ここ重要（チェックボックスUI）
  //       'public' => true,
  //       'show_ui' => true,
  //       'show_admin_column' => true, // ← 一覧に出る
  //       'show_in_rest' => true, // ← Gutenberg対応
  //     ]
  //   );
  // });

  add_action('save_post', function($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

    $terms = wp_get_post_terms($post_id, 'categorie');

    if (!empty($terms)) {
      $child_terms = [];

      foreach ($terms as $term) {

        // WP_Term以外を除外
        if (!($term instanceof WP_Term)) {
          continue;
        }

        if ($term->parent != 0) {
          $child_terms[] = $term->term_id;
        }
      }

      if (!empty($child_terms)) {
        wp_set_post_terms($post_id, $child_terms, 'categorie');
      }
    }
  });

  require_once get_template_directory() . '/inc/rest-api.php';
  require_once get_template_directory() . '/inc/block-parts.php';

?>
