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
  // テーマサポート追加
  // ------------------------------
  add_action('after_setup_theme', function() {
    add_theme_support('title-tag');
    add_theme_support('html5', [
      'search-form',
      'comment-form',
      'comment-list',
      'gallery',
      'caption',
      'style',
      'script',
    ]);

    register_nav_menus([
      'global_nav' => 'グローバルナビゲーション',
      'footer_nav' => 'フッターナビゲーション',
    ]);
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
  // JS,CSS用ロジック
  // ------------------------------

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

  // ------------------------------
  // 記事一覧用の概要文
  // ------------------------------
  function field_labo_auto_summary_meta_key() {
    return '_field_labo_auto_summary';
  }

  function field_labo_collect_block_text($blocks) {
    $texts = [];

    foreach ($blocks as $block) {
      if (($block['blockName'] ?? '') === 'acf/text') {
        $block_data = $block['attrs']['data'] ?? [];
        $block_text = $block_data['block_text'] ?? '';

        if ($block_text !== '') {
          $texts[] = $block_text;
        }
      }

      if (!empty($block['innerBlocks'])) {
        $texts = array_merge($texts, field_labo_collect_block_text($block['innerBlocks']));
      }
    }

    return $texts;
  }

  function field_labo_get_block_text_excerpt($post_id, $length = 120) {
    $post = get_post($post_id);

    if (!$post) {
      return '';
    }

    $texts = field_labo_collect_block_text(parse_blocks($post->post_content));
    $text = wp_strip_all_tags(implode(' ', $texts), true);
    $text = html_entity_decode($text, ENT_QUOTES, get_bloginfo('charset'));
    $text = preg_replace('/\s+/u', ' ', $text);
    $text = trim($text);

    if ($text === '') {
      return '';
    }

    if (function_exists('mb_substr')) {
      return mb_substr($text, 0, $length);
    }

    return substr($text, 0, $length);
  }

  function field_labo_update_auto_summary($post_id) {
    $summary = field_labo_get_block_text_excerpt($post_id);
    $meta_key = field_labo_auto_summary_meta_key();

    if ($summary === '') {
      delete_post_meta($post_id, $meta_key);
      return;
    }

    update_post_meta($post_id, $meta_key, $summary);
  }

  function field_labo_get_post_summary($post_id = null, $length = 120) {
    $post_id = $post_id ?: get_the_ID();
    $summary = get_field('post_summary', $post_id);

    if (trim(wp_strip_all_tags((string) $summary)) !== '') {
      return $summary;
    }

    $auto_summary = get_post_meta($post_id, field_labo_auto_summary_meta_key(), true);

    if (trim((string) $auto_summary) !== '') {
      if (function_exists('mb_substr')) {
        return mb_substr($auto_summary, 0, $length);
      }

      return substr($auto_summary, 0, $length);
    }

    return '';
  }

  add_action('save_post', function($post_id, $post, $update) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) return;
    if (!in_array($post->post_type, ['blog', 'projects'], true)) return;

    field_labo_update_auto_summary($post_id);
  }, 20, 3);

  add_action('save_post_inspo', function($post_id, $post, $update) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) return;

    $terms = wp_get_post_terms($post_id, 'categorie');

    if (!is_wp_error($terms) && !empty($terms)) {
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
        wp_set_post_terms($post_id, $child_terms, 'categorie', false);
      }
    }
  }, 10, 3);

  require_once get_template_directory() . '/inc/rest-api.php';
  require_once get_template_directory() . '/inc/block-parts.php';
  require_once get_template_directory() . '/inc/post-types.php';

?>
