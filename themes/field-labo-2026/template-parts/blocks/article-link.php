<?php

$article = get_field('block_article');
if (!$article) return;

$permalink = get_permalink($article->ID);
$title = get_the_title($article->ID);
$thumb = get_field('post_thumb', $article->ID);
$summary = get_field('post_summary', $article->ID);
$img = $thumb['img-pc'] ?? '';

?>

<a class="contents__embed" href="<?php echo esc_url($permalink); ?>">
  <div class="c-thumbnail">
    <?php if ($img) : ?>
      <div class="c-thumbnail__main_img">
        <img src="<?php echo esc_url($img); ?>" alt="" loading="lazy">
      </div>
    <?php endif; ?>
    <div class="c-thumbnail__text-wrapper">
      <div class="c-thumbnail__title f-inter-B"><p><?php echo esc_html($title); ?></p></div>
      <div class="c-thumbnail__summary f-noto-M">
        <p><?php echo wp_kses_post(field_labo_get_post_summary()); ?></p>
      </div>
      <div class="c-thumbnail__viewmore">
        <div class="c-thumbnail__viewmore-icon"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-link.svg" alt="viewmore"/></div>
        <p class="c-thumbnail__viewmore-text f-inter-B">view more</p>
      </div>
    </div>
  </div>
</a>



<a class="article-link-block" href="<?php echo esc_url($permalink); ?>">
  <?php if ($img) : ?>
    <div class="article-link-block__img">
      <img src="<?php echo esc_url($img); ?>" alt="">
    </div>
  <?php endif; ?>

  <div class="article-link-block__body">
    <p class="article-link-block__title"><?php echo esc_html($title); ?></p>

    <?php if ($summary) : ?>
      <p class="article-link-block__summary">
        <?php echo nl2br(esc_html($summary)); ?>
      </p>
    <?php endif; ?>
  </div>
</a>
