<?php

$article = get_field('block_article');
if (!$article) return;

$permalink = get_permalink($article->ID);
$title = get_the_title($article->ID);
$thumb = get_field('post_thumb', $article->ID);
$summary = get_field('post_summary', $article->ID);
$img = $thumb['img-pc'] ?? '';

?>

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
