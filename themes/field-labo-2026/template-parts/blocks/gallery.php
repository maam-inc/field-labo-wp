<?php

$gallery = get_field('block_gallery');

if (!$gallery) {
  return;
}
?>

<div class="gallery-block">
  <?php foreach ($gallery as $image) : ?>
    <?php if (!empty($image['ID'])) : ?>
      <figure class="gallery-block__item">
        <?php echo wp_get_attachment_image($image['ID'], 'large'); ?>
      </figure>
    <?php endif; ?>
  <?php endforeach; ?>
</div>
