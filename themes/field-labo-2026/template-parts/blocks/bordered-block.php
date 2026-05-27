<?php

$block_frame = get_field('block_frame');
$bordered_block = get_field('block_bordered_block');

if (!$block_frame && !$bordered_block) {
  return;
}

$get_value = function($source, $keys) use (&$get_value) {
  if (!$source || !is_array($source)) {
    return null;
  }

  foreach ($keys as $key) {
    if (array_key_exists($key, $source) && $source[$key] !== '' && $source[$key] !== null) {
      return $source[$key];
    }
  }

  foreach ($source as $value) {
    if (is_array($value)) {
      $found = $get_value($value, $keys);

      if ($found !== null && $found !== '') {
        return $found;
      }
    }
  }

  return null;
};

$get_first_scalar = function($value) use (&$get_first_scalar) {
  if (!is_array($value)) {
    return $value;
  }

  foreach ($value as $child) {
    $found = $get_first_scalar($child);

    if ($found !== null && $found !== '') {
      return $found;
    }
  }

  return null;
};

$get_image = function($img) use (&$get_image) {
  if (!$img) {
    return null;
  }

  if (is_array($img)) {
    $id = $img['ID'] ?? $img['id'] ?? '';

    if (!$id && empty($img['url'])) {
      foreach ($img as $value) {
        $image = $get_image($value);

        if ($image && !empty($image['url'])) {
          return $image;
        }
      }
    }

    return [
      'id'     => $id,
      'url'    => $img['url'] ?? '',
      'width'  => $img['width'] ?? '',
      'height' => $img['height'] ?? '',
      'alt'    => $img['alt'] ?? ($id ? get_post_meta($id, '_wp_attachment_image_alt', true) : ''),
    ];
  }

  if (is_numeric($img)) {
    $image = wp_get_attachment_image_src($img, 'full');

    if (!$image) {
      return null;
    }

    return [
      'id'     => $img,
      'url'    => $image[0],
      'width'  => $image[1],
      'height' => $image[2],
      'alt'    => get_post_meta($img, '_wp_attachment_image_alt', true),
    ];
  }

  return [
    'id'     => '',
    'url'    => $img,
    'width'  => '',
    'height' => '',
    'alt'    => '',
  ];
};

$render_frame_image = function($img, $cap = '', $class = 'beforeAfter__img') use ($get_first_scalar, $get_image) {
  $image = $get_image($img);
  $cap = $get_first_scalar($cap);

  if (!$image || empty($image['url'])) {
    return;
  }

  if ($class === null) {
    ?>
    <div class="contents__img">
      <picture>
        <source srcset="<?php echo esc_url($image['url']); ?>.webp" type="image/webp">
        <img
          <?php if (!empty($image['width'])) : ?>width="<?php echo esc_attr($image['width']); ?>"<?php endif; ?>
          <?php if (!empty($image['height'])) : ?>height="<?php echo esc_attr($image['height']); ?>"<?php endif; ?>
          src="<?php echo esc_url($image['url']); ?>"
          alt="<?php echo esc_attr($image['alt']); ?>"
          loading="lazy"
        />
      </picture>
    </div>

    <?php if ($cap) : ?>
      <p class="contents__cap f-noto-M"><?php echo nl2br(esc_html($cap)); ?></p>
    <?php endif; ?>
    <?php
    return;
  }
  ?>
  <div class="contents__img-full <?php echo esc_attr($class); ?>">
    <div class="contents__img">
      <img
        <?php if (!empty($image['width'])) : ?>width="<?php echo esc_attr($image['width']); ?>"<?php endif; ?>
        <?php if (!empty($image['height'])) : ?>height="<?php echo esc_attr($image['height']); ?>"<?php endif; ?>
        src="<?php echo esc_url($image['url']); ?>"
        alt="<?php echo esc_attr($image['alt']); ?>"
        loading="lazy"
      />
    </div>

    <?php if ($cap) : ?>
      <p class="contents__cap f-noto-M"><?php echo nl2br(esc_html($cap)); ?></p>
    <?php endif; ?>
  </div>
  <?php
};

$render_col2_column = function($column, $index) use ($get_first_scalar, $get_value, $render_frame_image) {
  if (!$column || !is_array($column)) {
    return;
  }

  $type = $get_first_scalar($get_value($column, ['type']));

  if ($type === 'image') {
    $img = $get_value($column, ['image', 'img']);
    $cap = $get_first_scalar($get_value($column, ['cap', 'caption']));

    if (!$img) {
      return;
    }
    ?>
    <div class="contents__column-item contents__column-item--<?php echo esc_attr($index); ?>">
      <?php $render_frame_image($img, $cap, null); ?>
    </div>
    <?php
    return;
  }

  if ($type === 'text') {
    $text = $get_first_scalar($get_value($column, ['text']));

    if (!$text) {
      return;
    }
    ?>
    <div class="contents__column-item contents__column-item--<?php echo esc_attr($index); ?>">
      <?php echo wp_kses_post(str_replace('<p>', '<p class="f-noto-M">', wpautop($text))); ?>
    </div>
    <?php
    return;
  }

  $img = $get_value($column, ['image', 'img']);
  $text = $get_first_scalar($get_value($column, ['text']));
  $cap = $get_first_scalar($get_value($column, ['cap', 'caption']));

  if (!$img && !$text) {
    return;
  }
  ?>
  <div class="contents__column-item contents__column-item--<?php echo esc_attr($index); ?>">
    <?php if ($img) : ?>
      <?php $render_frame_image($img, $cap, null); ?>
    <?php endif; ?>

    <?php if ($text) : ?>
      <?php echo wp_kses_post(str_replace('<p>', '<p class="f-noto-M">', wpautop($text))); ?>
    <?php endif; ?>
  </div>
  <?php
};

$render_frame_col2 = function($row) use ($render_col2_column) {
  $left_column = $row['col2-left'] ?? null;
  $right_column = $row['col2-right'] ?? null;

  if (!$left_column && !$right_column) {
    return;
  }
  ?>
  <div class="contents__column contents__column-text">
    <?php $render_col2_column($left_column, 1); ?>
    <?php $render_col2_column($right_column, 2); ?>
  </div>
  <?php
};
?>

<div class="contents__beforeAfter">
  <?php if ($block_frame && is_array($block_frame)) : ?>
    <?php foreach ($block_frame as $row) : ?>
      <?php
      $layout = str_replace('_', '-', $row['acf_fc_layout'] ?? '');
      ?>

      <?php if ($layout === 'frame-heading') : ?>
        <?php $heading = $get_first_scalar($get_value($row, ['heading', 'block_heading'])); ?>
        <?php if ($heading) : ?>
          <h2 class="contents__head beforeAfter__head f-noto-B"><?php echo nl2br(esc_html($heading)); ?></h2>
        <?php endif; ?>
      <?php elseif ($layout === 'frame-text') : ?>
        <?php $text = $get_first_scalar($get_value($row, ['text', 'block_text'])); ?>
        <?php if ($text) : ?>
          <?php echo wp_kses_post(str_replace('<p>', '<p class="contents__text beforeAfter__text f-noto-M">', wpautop($text))); ?>
        <?php endif; ?>
      <?php elseif ($layout === 'frame-img') : ?>
        <?php
        $img = $get_value($row, ['img', 'image', 'block_img-ph', 'block_img_ph']);
        $cap = $get_first_scalar($get_value($row, ['cap', 'caption', 'block_img-cap', 'block_img_cap']));
        $render_frame_image($img, $cap);
        ?>
      <?php elseif ($layout === 'frame-col2') : ?>
        <?php $render_frame_col2($row); ?>
      <?php endif; ?>
    <?php endforeach; ?>
  <?php else : ?>
    <?php echo wp_kses_post($bordered_block); ?>
  <?php endif; ?>
</div>
