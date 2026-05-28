<?php

$article = get_field('block_article');
if (!$article) return;

$permalink = get_permalink($article->ID);
$title = get_the_title($article->ID);
$thumb = get_field('post_thumb', $article->ID);
$img = $thumb['img-pc'] ?? '';

?>

<a class="contents__embed" href="<?php echo esc_url($permalink); ?>">
  <div class="c-thumbnail">
    <?php if ($img) : ?>
      <div class="c-thumbnail__main_img">
        <picture>
          <source srcset="<?php echo esc_url($img); ?>.webp" type="image/webp">
          <img src="<?php echo esc_url($img); ?>" alt="" loading="lazy">
        </picture>
      </div>
    <?php endif; ?>
    <div class="c-thumbnail__text-wrapper">
      <p class="c-thumbnail__title f-inter-B"><?php echo esc_html($title); ?></p>
      <p class="c-thumbnail__summary f-noto-M"><?php echo wp_kses_post(field_labo_get_post_summary($article->ID)); ?></p>
      <div class="c-thumbnail__viewmore">
        <div class="c-thumbnail__viewmore-icon">
          <div class="c-thumbnail__viewmore-mask"></div>
        </div>
        <p class="c-thumbnail__viewmore-text f-inter-B">view more</p>
      </div>
    </div>
  </div>
</a>
