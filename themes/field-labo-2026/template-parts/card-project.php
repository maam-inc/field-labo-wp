<div class="project__article">
  <a href="<?php the_permalink(); ?>">
    <div class="main_img">
      <?php
        $group_field = get_field('common_parts');
        $img_field = $group_field['img_main'];
        $img_url = $img_field['image'];
      ?>
      <img
        src="<?php echo esc_url($img_url); ?>"
        alt="<?php echo esc_attr(get_the_title()); ?>"
      />

    </div>
    <p class="title"><?php the_title(); ?></p>
    <p class="summary"><?php the_field('summary'); ?></p>

  </a>
</div>