<?php

$gallery = get_field('block_gallery');

if (!$gallery) {
  return;
}
?>

<button class="contents__gallery" type="button">
  <?php foreach ($gallery as $image) : ?>
    <div class="contents__gallery-img contents__img">
      <picture>
        <source srcset="<?php echo $image; ?>.webp" type="image/webp">
        <img src="<?php echo $image; ?>" alt="" loading="lazy">
      </picture>
      <div class="btn">
        <div class="btn__open btn__open-gallery"></div>
      </div>
    </div>
  <?php endforeach; ?>
</button>
