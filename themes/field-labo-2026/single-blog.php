<?php get_header(); ?>
<div class="article">
  <div class="article__wrapper">
    <div class="article__main"> 

      <!-- THUMB -->
      <?php $thumb = get_field('post_thumb'); ?>
      <div class="main_img">
        <picture>
          <source srcset="<?php echo $thumb['img-pc']; ?>"  media="(min-width: 769px)">
          <img src="<?php echo $thumb['img-sp']; ?>"/>
        </picture>
      </div>
    </div>

    <!-- TITLE -->
    <h1>
      <?php echo get_the_title(); ?>
    </h1>
    <?php
      $date = new DateTime(get_the_date('Y-m-d'));
      $post_type_labels = [
        'project' => 'PROJECTS',
        'blog' => 'BLOG & NOTE',
      ];
      $post_type = get_post_type();
    ?>
    <p>(<?php echo $post_type_labels[$post_type]; ?>,  <?php echo $date->format('Y.') . strtoupper($date->format('M')); ?>)</p>
    
    <!-- 本文 -->
    <?php if (trim(get_the_content()) !== '') : ?>
      <div class="article__contents">
        <?php the_content(); ?>
      </div>
    <?php endif; ?>
  
  </div>
</div>
<?php get_footer(); ?>
