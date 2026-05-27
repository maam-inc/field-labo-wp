<?php
$img_id = get_field('block_img-ph');
if (!$img_id) return;

$image = wp_get_attachment_image_src($img_id, 'full');
if (!$image) { return; }

$cap = get_field('block_img-cap');
$alt = get_post_meta($img_id, '_wp_attachment_image_alt', true);
?>

<div class="contents__img-full">
  <div class="contents__img">
    <picture>
      <source srcset="<?php echo esc_url($image[0]); ?>.webp" type="image/webp">
      <img
        width="<?php echo esc_attr($image[1]); ?>"
        height="<?php echo esc_attr($image[2]); ?>"
        src="<?php echo esc_url($image[0]); ?>"
        alt="<?php echo esc_attr($alt); ?>"
        loading="lazy"
      />
    </picture>
  </div>
  <?php if ($cap) : ?>
    <p class="contents__cap f-noto-M"><?php echo nl2br(esc_html($cap)); ?></p>
  <?php endif; ?>
</div>
