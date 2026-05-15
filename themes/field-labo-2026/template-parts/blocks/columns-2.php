<?php

$left_column = get_field('block_col2--l');
$right_column = get_field('block_col2--r');

if (!$left_column && !$right_column) {
  return;
}

$render_col2_column = function($column) {
  if (!$column || !is_array($column)) {
    return;
  }

  $type = $column['type'] ?? '';

  // 画像
  // ------------------------------
  if ($type === 'image') {
    $img_id = $column['image'] ?? '';
    $cap = $column['cap'] ?? '';
    $is_zoom = !empty($column['is-zoom']);

    if (!$img_id) {
      return;
    }

    $image = wp_get_attachment_image_src($img_id, 'full');
    if (!$image) {
      return;
    }

    $alt = get_post_meta($img_id, '_wp_attachment_image_alt', true);
    ?>
    <figure class="columns-2-block__image">
      <div class="columns-2-block__image-inner">
        <img
          width="<?php echo esc_attr($image[1]); ?>"
          height="<?php echo esc_attr($image[2]); ?>"
          src="<?php echo esc_url($image[0]); ?>"
          class=""
          alt="<?php echo esc_attr($alt); ?>"
          loading="lazy"
        />

        <?php if ($is_zoom) : ?>
          <button
            class="btn js-modalOpen"
            data-id="imgModal"
            data-post="<?php echo esc_attr(get_the_ID()); ?>"
            data-type="inner"
            data-img="<?php echo esc_url($image[0]); ?>"
          >
            <div class="inner"></div>
          </button>
        <?php endif; ?>
      </div>

      <?php if ($cap) : ?>
        <figcaption><?php echo nl2br(esc_html($cap)); ?></figcaption>
      <?php endif; ?>
    </figure>
    <?php
    return;
  }

  // テキスト
  // ------------------------------
  if ($type === 'text') {
    $text = $column['text'] ?? '';

    if (!$text) {
      return;
    }

    echo wp_kses_post(str_replace('<p>', '<p class="text-block">', wpautop($text)));
    return;
  }

  if ($type === 'table') {
    $table = $column['table'] ?? [];

    if (!$table || !is_array($table)) {
      return;
    }
    ?>
    <dl class="table">
      <?php foreach ($table as $row) : ?>
        <?php
        $item = $row['item'] ?? '';
        $desc = $row['desc'] ?? '';
        ?>
        <dt><?php echo esc_html($item); ?></dt>
        <dd><?php echo wp_kses_post($desc); ?></dd>
      <?php endforeach; ?>
    </dl>
    <?php
    return;
  }
};
?>

<div class="columns-2-block">
  <div class="columns-2-block__item">
    <?php $render_col2_column($left_column); ?>
  </div>

  <div class="columns-2-block__item">
    <?php $render_col2_column($right_column); ?>
  </div>
</div>
