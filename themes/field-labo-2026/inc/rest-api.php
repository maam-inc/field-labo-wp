<?php

  /**
  * REST API 用の処理をまとめるファイル。
  *
  * このファイルでは、JavaScript から取得するための記事一覧APIを定義します。
  * 例: /wp-json/field-labo/v1/inspo?page=1
  */


  // -----------------------------------------
  // 共通 - 独自APIのURLをWPに登録する
  // -----------------------------------------
  add_action('rest_api_init', function() {
    // field-labo/v1 => namespace
    // /inspo => route

    register_rest_route('field-labo/v1', '/inspo', [
      'methods' => 'GET',   // データを取得するだけ
      'callback' => 'get_inspo_posts',    // このAPIにアクセスしたときに実行する関数
      'permission_callback' => '__return_true'  // ログインしてないユーザーにも許可する
    ]);

    // モーダル詳細用API
    // 例: /wp-json/field-labo/v1/inspo/123
    register_rest_route('field-labo/v1', '/inspo/(?P<id>\d+)', [
      'methods' => 'GET',
      'callback' => 'get_inspo_post_detail',
      'permission_callback' => '__return_true'
    ]);

    // アーカイブページ LOAD MORE 用API
    register_rest_route('field-labo/v1', '/archive', [
      'methods' => 'GET',
      'callback' => 'load_archive',
      'permission_callback' => '__return_true',
    ]);

    // FAQページ
    register_rest_route('field-labo/v1', '/faq/(?P<id>\d+)', [
      'methods' => 'GET',
      'callback' => 'get_faq_detail',
      'permission_callback' => '__return_true',
    ]);
  });

  // -----------------------------------------
  // TOP 一覧用の記事データを返す
  // -----------------------------------------
  function get_inspo_posts($request) {
    // パラメーターからページを取得。なければ「1」
    $page = max(1, (int) $request->get_param('page'));

    // パラメーターからカテゴリを取得。ソート用。
    $cat = sanitize_text_field((string) $request->get_param('category'));
    $sort = sanitize_text_field((string) $request->get_param('sort'));


    // 取得する記事の条件
    $args = [
      'post_type' => 'inspo',
      'posts_per_page' => 5,
      'paged' => $page,
      'post_status' => 'publish',
      'orderby' => 'date',
      'order' => 'DESC',
    ];

    if( $sort === 'random' ) {
      $args['orderby'] = 'rand';
      unset($args['order']);
    }

    // カテゴリが指定されていて、allではない場合だけカテゴリで絞り込む
    if( $cat && $cat !== 'all' ) {
      // $args['category_name'] = $cat;
      $args['tax_query'] = [
        [
          'taxonomy' => 'categorie',
          'field' => 'slug',
          'terms' => $cat,
        ]
      ];
    }

    $query = new WP_Query($args);
    $posts = [];

    // WP_Queryで取得した投稿をJSで扱いやすい形に
    while( $query -> have_posts() ) {
      $query -> the_post();

      $images = get_field('images', get_the_ID()) ?: [];
      $image_url = $images[0] ?? '';

      $posts[] = [
        'id' => get_the_ID(),
        'title' => get_the_title(),
        'image' => $image_url,
      ];
    }

    wp_reset_postdata();

    // このreturnがブラウザではJSONとして受け取れる
    return [
      'posts' => $posts,
      'max_pages' => (int) $query -> max_num_pages,
      'current_page' => $page,
      'cat' => $cat ?: 'all',
      'sort' => $sort ?: 'latest',
    ];

  }

  // -----------------------------------------
  // TOP - モーダル詳細用の記事データを返す
  // -----------------------------------------
  function get_inspo_post_detail($request) {
    // URL内の投稿IDを取得
    $post_id = (int) $request['id'];

    // 投稿が存在しない場合は404を返す
    if(!$post_id || get_post_status($post_id) !== 'publish') {
      return new WP_Error('not_found', 'Post not found', ['status' => 404]);
    }

    // 対象投稿のタームを取得
    $terms = wp_get_object_terms($post_id, 'categorie');
    $categories = [];

    if(!is_wp_error($terms)) {
      foreach($terms as $term) {
        // 子カテゴリだけ返す
        if($term->parent != 0) {
          $categories[] = [
            'id' => $term->term_id,
            'name' => $term->name,
            'url' => get_term_link($term) . '?view=top',
          ];
        }
      }
    }

    // ACFの関連記事をJSで扱いやすい形に整える
    $links = [];
    $related_posts = get_field('related', $post_id);

    if($related_posts) {
      foreach($related_posts as $post) {
        $links[] = [
          'title' => get_the_title($post),
          'url' => get_permalink($post),
          'post_type' => get_post_type($post),
        ];
      }
    }

    // if(have_rows('links', $post_id)) {
    //   while(have_rows('links', $post_id)) {
    //     the_row();

    //     $related_post = get_sub_field('post');
    //     $related_post_id = is_object($related_post) ? $related_post->ID : (int) $related_post;

    //     if($related_post_id) {
    //       $links[] = [
    //         'text' => get_sub_field('article'),
    //         'url' => get_permalink($related_post_id),
    //       ];
    //     }
    //   }
    // }

    $gallery = get_field('images', $post_id);
    $image_urls = [];

    if(is_array($gallery)) {
      $image_urls = array_values(array_filter($gallery));
    }

    return [
      'id' => $post_id,
      'title' => get_the_title($post_id),
      'images' => $image_urls,
      'text' => get_field('text', $post_id),
      'categories' => $categories,
      'links' => $links,
    ];
  }


  // -----------------------------------------
  // アーカイブページ用 - LOAD MOREで追加表示するHTMLを返す
  // -----------------------------------------
  function load_archive($request) {
    $post_type = sanitize_key($request->get_param('post_type') ?: 'post');
    $page = max(1, (int) $request->get_param('page'));
    $per_page = max(1, (int) ($request->get_param('per_page') ?: get_option('posts_per_page')));

    $allowed_post_types = ['project', 'blog'];

    if (!in_array($post_type, $allowed_post_types, true)) {
      return new WP_Error('invalid_post_type', 'Invalid post type.', ['status' => 400]);
    }

    $query = new WP_Query([
      'post_type' => $post_type,
      'post_status' => 'publish',
      'paged' => $page,
      'posts_per_page' => $per_page,
      'orderby' => 'date',
      'order' => 'DESC',
    ]);

    ob_start();

    if ($query->have_posts()) {
      while ($query->have_posts()) {
        $query->the_post();

        get_template_part('template-parts/card', $post_type);
      }
    }

    wp_reset_postdata();

    return [
      'html' => ob_get_clean(),
      'current_page' => $page,
      'max_page' => (int) $query->max_num_pages,
    ];
  }

  // -----------------------------------------
  // FAQ用
  // -----------------------------------------
  function get_faq_detail($request) {
    $post_id = (int) $request['id'];
    ob_start();

    get_template_part('template-parts/modal-faq', null, [
      'post_id' => $post_id,
    ]);

    $html = ob_get_clean();

    return [
      'id' => $post_id,
      'question' => get_field('question', $post_id),
      'answer' => $html,
    ];
  }
?>