<?php get_header(); ?>
<?php if (have_posts()) : ?>
  <?php while (have_posts()) : the_post(); ?>


<div class="l-content">
  <div class="l-content__wrapper"> 
    <div class="article" id="article">

      <!-- THUMB -->
      <?php $thumb = get_field('post_thumb'); ?>
      <main class="main">
        <div class="main__img">
          <picture>
            <source srcset="<?php echo esc_url($thumb['img-pc'] ?? ''); ?>"  media="(min-width: 769px)">
            <img src="<?php echo esc_url($thumb['img-sp'] ?? ''); ?>" alt="<?php echo esc_attr(get_the_title()); ?>"/>
          </picture>
        </div>
        <h1 class="main__title f-inter-B"><?php echo esc_html(get_the_title()); ?></h1>
        <?php
          $date = new DateTime(get_the_date('Y-m-d'));
          $post_type_labels = [
            'projects' => 'PROJECTS',
            'blog' => 'BLOG & NOTE',
          ];
          $post_type = get_post_type();
        ?>
        <p class="main__info f-inter-B">(&ensp;&ensp;&ensp;&ensp;&ensp;<?php echo esc_html($post_type_labels[$post_type] ?? $post_type); ?>,  <?php echo esc_html($date->format('Y.') . strtoupper($date->format('M'))); ?>&ensp;&ensp;&ensp;&ensp;&ensp;)</p>
      </main>


        
    <!-- 本文 -->
    <?php if (trim(get_the_content()) !== '') : ?>
      <section class="contents">
        <?php the_content(); ?>
      </div>
    <?php endif; ?>  
  </div>
</div>
<a class="bottom" href="<?php echo home_url('blog'); ?>">
  <div class="bottom__icon"> </div>
  <div class="bottom__text f-inter-B">Back to index</div>
</a>
<div class="galleryModal" id="galleryModal">
  <div class="galleryModal__bg galleryModal__close"></div>
  <div class="galleryModal__container">
    <div class="galleryModal__img"><img src="" alt=""></div>
    <div class="c-ctrl__prev swiper-button-prev galleryModal__nav--prev"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-prev.svg" alt="prev"/></div>
    <div class="c-ctrl__next swiper-button-next galleryModal__nav--next"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-next.svg" alt="next"/></div>
  </div>
  <button class="c-modalCloseIcon__btn btn-close galleryModal__btn galleryModal__close">
    <div class="c-modalCloseIcon__btn-inner">
      <div class="c-modalCloseIcon__btn-icon"></div>
    </div>
  </button>
</div>
<div class="dataModal" id="dataModal">
  <div class="dataModal__bg dataModal__close"></div>
  <div class="dataModal__container">
    <div class="dataModal__img"><img src="" alt=""></div>
  </div>
  <button class="c-modalCloseIcon__btn btn-close dataModal__btn dataModal__close">
    <div class="c-modalCloseIcon__btn-inner">
      <div class="c-modalCloseIcon__btn-icon"></div>
    </div>
  </button>
</div>
<?php endwhile; ?>
<?php endif; ?>
<?php get_footer(); ?>
