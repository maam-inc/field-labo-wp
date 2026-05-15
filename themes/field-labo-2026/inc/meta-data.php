<?php

// ------------------------------
// タイトルメタ管理用
// ------------------------------

global $post;

$site_name = get_bloginfo('name');
$site_description = get_bloginfo('description');

$title = '';
$description = '';
$output_title = '';
$page_url = home_url('/');
$page_type = 'website';
$ogp_img = '';

/**
 * meta description用にテキストを整形する
 */
// 要約にするかも
function format_meta_description($text, $limit = 120) {
  $text = wp_strip_all_tags((string) $text);
  $text = preg_replace('/\s+/u', ' ', $text);
  $text = trim($text);

  if(mb_strlen($text, 'UTF-8') > $limit) {
    $text = mb_substr($text, 0, $limit, 'UTF-8').'…';
  }

  return $text;
}

/**
 * ACF柔軟コンテンツからdescription候補のテキストを取得する
 */
function get_flexible_content_description($post_id, $limit = 120) {
  if(!function_exists('have_rows')) {
    return '';
  }

  $text = '';

  // ACF柔軟コンテンツのフィールド名が変わる場合は、ここを実際のフィールド名に合わせる
  $flexible_fields = ['contents', 'content', 'cont'];
  $text_keys = ['txt', 'text', 'body', 'lead', 'main_txt', 'main_lead'];

  foreach($flexible_fields as $field_name) {
    if(!have_rows($field_name, $post_id)) {
      continue;
    }

    while(have_rows($field_name, $post_id)) {
      the_row();

      foreach($text_keys as $key) {
        $value = get_sub_field($key);

        if(is_array($value)) {
          $value = implode('', array_filter($value, 'is_scalar'));
        }

        if(is_scalar($value) && $value !== '') {
          $text .= ' '.$value;
        }

        if(mb_strlen(format_meta_description($text, 1000), 'UTF-8') >= $limit) {
          break 2;
        }
      }
    }

    if($text !== '') {
      break;
    }
  }

  return format_meta_description($text, $limit);
}

/**
 * 現在ページのURLを取得する
 */
function get_current_url() {
  global $wp;

  if(is_singular()) {
    return get_permalink();
  }

  if(is_front_page()) {
    return home_url('/');
  }

  if(is_home()) {
    $page_for_posts = get_option('page_for_posts');
    return $page_for_posts ? get_permalink($page_for_posts) : home_url('/');
  }

  return home_url(add_query_arg([], $wp->request));
}

// 投稿・固定ページ・カスタム投稿詳細
if(is_singular()) {
  $post_id = get_queried_object_id();

  $title = get_the_title($post_id);

  if(has_excerpt($post_id)) {
    $description = format_meta_description(get_the_excerpt($post_id));
  }

  if($description === '') {
    $description = get_flexible_content_description($post_id);
  }

  if($description === '' && !empty($post->post_content)) {
    $description = format_meta_description($post->post_content);
  }

  $page_type = 'article';
  $page_url = get_permalink($post_id);

  if(has_post_thumbnail($post_id)) {
    $ogp_img = get_the_post_thumbnail_url($post_id, 'full');
  }
}

// 投稿タイプアーカイブ
elseif(is_post_type_archive()) {
  $post_type = get_query_var('post_type');
  $post_type = is_array($post_type) ? reset($post_type) : $post_type;
  $post_type_object = get_post_type_object($post_type);

  if($post_type_object) {
    $title = $post_type_object->labels->name;
    $description = $post_type_object->description ?: $site_description;
    $page_url = get_post_type_archive_link($post_type);
  }
}

// カテゴリー・タグ・タクソノミーアーカイブ
elseif(is_category() || is_tag() || is_tax()) {
  $term = get_queried_object();

  if($term && !is_wp_error($term)) {
    $title = $term->name.'の記事一覧';
    $description = term_description($term->term_id, $term->taxonomy);

    if($description === '') {
      $description = '「'.$term->name.'」の記事一覧ページです。';
    }

    $description = format_meta_description($description);
    $page_url = get_term_link($term);
  }
}

// 日付アーカイブ
elseif(is_year()) {
  $title = get_the_time('Y年').'の記事一覧';
  $description = '「'.get_the_time('Y年').'」に投稿された記事の一覧ページです。';
  $page_url = get_current_url();
}
elseif(is_month()) {
  $title = get_the_time('Y年n月').'の記事一覧';
  $description = '「'.get_the_time('Y年n月').'」に投稿された記事の一覧ページです。';
  $page_url = get_current_url();
}
elseif(is_day()) {
  $title = get_the_time('Y年n月j日').'の記事一覧';
  $description = '「'.get_the_time('Y年n月j日').'」に投稿された記事の一覧ページです。';
  $page_url = get_current_url();
}

// 投稿者アーカイブ
elseif(is_author()) {
  $author_id = get_query_var('author');
  $author_name = get_the_author_meta('display_name', $author_id);

  $title = $author_name.'が投稿した記事一覧';
  $description = '「'.$author_name.'」が書いた記事の一覧ページです。';
  $page_url = get_author_posts_url($author_id);
}

// 検索結果
elseif(is_search()) {
  $search_query = get_search_query();

  $title = '「'.$search_query.'」の検索結果';
  $description = '「'.$search_query.'」の検索結果ページです。';
  $page_url = get_search_link($search_query);
}

// 404
elseif(is_404()) {
  $title = 'ページが見つかりません';
  $description = 'お探しのページは見つかりませんでした。';
  $page_url = home_url('/404');
}

// TOP・その他
else {
  $title = $site_name;
  $description = $site_description;
  $page_url = get_current_url();
}

if($description === '') {
  $description = $site_description;
}

if($ogp_img === '') {
  $ogp_img = get_template_directory_uri().'/assets/images/og.jpg';
}

if($title !== '' && $title !== $site_name) {
  $output_title = $title.' | '.$site_name;
} else {
  $title = $site_name;
  $output_title = $site_name;
}
?>

