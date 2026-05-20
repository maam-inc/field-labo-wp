<?php

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

?>
