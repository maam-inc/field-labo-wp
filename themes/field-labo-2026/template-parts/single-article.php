<?php
  $thumb = get_field('post_thumb');
  $thumb = is_array($thumb) ? $thumb : [];
  $thumb_pc = $thumb['img-pc'] ?? '';
  $thumb_sp = $thumb['img-sp'] ?? '';
  $thumb_pc = $thumb_pc ?: $thumb_sp;
  $thumb_sp = $thumb_sp ?: $thumb_pc;
  $date = new DateTime(get_the_date('Y-m-d'));
  $post_type = get_post_type();
  $post_type_labels = [
    'projects' => 'PROJECT',
    'blog' => 'BLOG & NOTE',
  ];
  $archive_url = get_post_type_archive_link($post_type);

  if (!$archive_url) {
    $archive_url = home_url($post_type);
  }
?>

<main>
  <article class="article" id="article">
    <div class="l-content">
      <div class="l-content__wrapper">
        <div class="main">
          <?php if ($thumb_pc || $thumb_sp) : ?>
            <div class="main__img">
              <picture>
                <source srcset="<?php echo esc_url($thumb_pc); ?>" media="(min-width: 769px)">
                <img src="<?php echo esc_url($thumb_sp); ?>" alt="<?php echo esc_attr(get_the_title()); ?>"/>
              </picture>
            </div>
          <?php endif; ?>
          <h1 class="main__title f-inter-B"><?php echo esc_html(get_the_title()); ?></h1>
          <p class="main__info f-inter-B"><?php echo esc_html($post_type_labels[$post_type] ?? $post_type); ?>,&ensp;<?php echo esc_html($date->format('Y.') . strtoupper($date->format('M'))); ?></p>
        </div>

        <?php if (trim(get_the_content()) !== '') : ?>
          <div class="contents">
            <?php the_content(); ?>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </article>
</main>

<a class="bottom" href="<?php echo esc_url($archive_url); ?>">
  <div class="bottom__icon"></div>
  <div class="bottom__text f-inter-B">Back to index</div>
</a>

<div class="galleryModal postModal" id="galleryModal">
  <div class="galleryModal__bg galleryModal__close postModal__bg"> </div>
  <div class="galleryModal__container postModal__container">

    <div class="galleryModal__img postModal__img"><img src="" alt=""></div>
    <div class="c-ctrl__prev swiper-button-prev galleryModal__nav--prev"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/common/icon-prev.svg" alt="prev"/></div>
    <div class="c-ctrl__next swiper-button-next galleryModal__nav--next"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/common/icon-next.svg" alt="next"/></div>
  </div>
  <button class="c-modalCloseIcon__btn btn-close galleryModal__btn galleryModal__close">
    <div class="c-modalCloseIcon__btn-inner">
      <div class="c-modalCloseIcon__btn-icon"></div>
    </div>
  </button>
</div>

<div class="dataModal postModal" id="dataModal">
  <div class="dataModal__bg dataModal__close postModal__bg"> </div>
  <div class="dataModal__container postModal__container">
    <div class="dataModal__img postModal__img"><img src="" alt=""></div>
  </div>
  <button class="c-modalCloseIcon__btn btn-close dataModal__btn dataModal__close">
    <div class="c-modalCloseIcon__btn-inner">
      <div class="c-modalCloseIcon__btn-icon"></div>
    </div>
  </button>
</div>
