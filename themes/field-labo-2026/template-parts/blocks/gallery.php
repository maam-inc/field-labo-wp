<?php

$gallery = get_field('block_gallery');

if (!$gallery) {
  return;
}
?>

<div class="contents__gallery">
  <?php foreach ($gallery as $image) : ?>
    <div class="contents__gallery-img contents__img">
      <img src="<?php echo $image; ?>" alt="" loading="lazy">
      <button class="btn">
        <div class="btn__open btn__open-gallery"></div>
      </button>
    </div>
  <?php endforeach; ?>
</div>
