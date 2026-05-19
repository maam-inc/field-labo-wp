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
    if ($query->is_post_type_archive('project')) {
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
      'show_in_rest' => true,
      'has_archive' => false,
      'rewrite' => [
        'slug' => 'inspo',
      ],
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
    register_post_type('project', [
      'label' => 'Projects',
      'public' => true,
      'show_in_rest' => true,
      'has_archive' => true,
      'rewrite' => [
        'slug' => 'projects',
      ],
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

  // カテゴリ　NOTEとTOPの出し分け
  // function add_custom_query_vars($vars){
  //   $vars[] = 'view';
  //   return $vars;
  // }
  // add_filter('query_vars', 'add_custom_query_vars');

  // JS,CSS用ロジック
  function get_asset_type() {
    if (is_front_page()) return 'top';
    if (is_singular()) return 'post';
    if (is_post_type_archive('faq')) return 'page';
    if (is_post_type_archive() || is_tax() || is_category() || is_tag() || is_archive()) return 'list';

    return 'page';
  }

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
