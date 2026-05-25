<?php
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

  // Projects / Blog のアーカイブRSSリンクを head に出力しない
  add_filter('feed_links_extra_show_post_type_archive_feed', function($show) {
    if (is_post_type_archive(['projects', 'blog'])) {
      return false;
    }

    return $show;
  });

  add_action('init', function() {
    $rewrite_version = '20260525_projects_structure_option';

    if (get_option('field_labo_rewrite_version') !== $rewrite_version) {
      if (get_option('projects_structure', false) === false) {
        $legacy_structure = get_option('project_structure', '/%post_id%/');
        update_option('projects_structure', $legacy_structure);
      }

      flush_rewrite_rules(false);
      update_option('field_labo_rewrite_version', $rewrite_version);
    }
  }, 20);

?>
