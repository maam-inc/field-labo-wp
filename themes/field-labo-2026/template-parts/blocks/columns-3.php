<?php

$left_column = get_field('block_col3-left');
$center_column = get_field('block_col3-center');
$right_column = get_field('block_col3-right');

if (!$left_column && !$center_column && !$right_column) {
  return;
}

$render_col3_column = function($column, $index) {
  if (!$column || !is_array($column)) {
    return;
  }

  $img = $column['image'] ?? '';
  $cap = $column['cap'] ?? '';

  if (!$img) {
    return;
  }

  $image = null;
  $alt = '';

  if (is_array($img)) {
    $image = [
      $img['url'] ?? '',
      $img['width'] ?? '',
      $img['height'] ?? '',
    ];
    $alt = $img['alt'] ?? '';
  } elseif (is_numeric($img)) {
    $image = wp_get_attachment_image_src($img, 'full');
    $alt = get_post_meta($img, '_wp_attachment_image_alt', true);
  } else {
    $image = [$img, '', ''];
  }

  if (!$image || empty($image[0])) {
    return;
  }
  ?>
  <div class="contents__column-item contents__column-item--<?php echo esc_attr($index); ?>">
    <div class="contents__img">
      <picture>
        <source srcset="<?php echo esc_url($image[0]); ?>.webp" type="image/webp">
        <img
          <?php if (!empty($image[1])) : ?>width="<?php echo esc_attr($image[1]); ?>"<?php endif; ?>
          <?php if (!empty($image[2])) : ?>height="<?php echo esc_attr($image[2]); ?>"<?php endif; ?>
          src="<?php echo esc_url($image[0]); ?>"
          alt="<?php echo esc_attr($alt); ?>"
          loading="lazy"
        />
      </picture>
      <?php if ($cap) : ?>
        <p class="contents__cap f-noto-M"><?php echo nl2br(esc_html($cap)); ?></p>
      <?php endif; ?>
    </div>
  </div>
  <?php
};
?>

<div class="contents__column">
  <?php $render_col3_column($left_column, 1); ?>
  <?php $render_col3_column($center_column, 2); ?>
  <?php $render_col3_column($right_column, 3); ?>
</div>
