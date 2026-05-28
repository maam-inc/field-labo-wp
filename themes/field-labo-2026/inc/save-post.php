<?php

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

        if ($term->slug === 'all-photos') {
          continue;
        }

        if ($term->parent != 0) {
          $child_terms[] = $term->term_id;
        }
      }

      wp_set_post_terms($post_id, $child_terms, 'categorie', false);
    }
  }, 10, 3);

?>
