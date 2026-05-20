<?php get_header(); ?>
<?php if (have_posts()) : ?>
  <?php while (have_posts()) : the_post(); ?>
<div class="article">
  <div class="article__wrapper">
    <div class="article__main"> 

      <!-- THUMB -->
      <?php $thumb = get_field('post_thumb'); ?>
      <div class="main_img">
        <picture>
          <source srcset="<?php echo esc_url($thumb['img-pc'] ?? ''); ?>"  media="(min-width: 769px)">
          <img src="<?php echo esc_url($thumb['img-sp'] ?? ''); ?>" alt="<?php echo esc_attr(get_the_title()); ?>"/>
        </picture>
      </div>
    </div>

    <!-- TITLE -->
    <h1>
      <?php echo esc_html(get_the_title()); ?>
    </h1>
    <?php
      $date = new DateTime(get_the_date('Y-m-d'));
      $post_type_labels = [
        'projects' => 'PROJECTS',
        'blog' => 'BLOG & NOTE',
      ];
      $post_type = get_post_type();
    ?>
    <p>(<?php echo esc_html($post_type_labels[$post_type] ?? $post_type); ?>,  <?php echo esc_html($date->format('Y.') . strtoupper($date->format('M'))); ?>)</p>
    
    <!-- 本文 -->
    <?php if (trim(get_the_content()) !== '') : ?>
      <div class="article__contents">
        <?php the_content(); ?>
      </div>
    <?php endif; ?>
  
  </div>
</div>
  <?php endwhile; ?>
<?php endif; ?>
<?php get_footer(); ?>
