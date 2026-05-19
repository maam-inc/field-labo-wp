<a class="projects__gallery-item" href="<?php the_permalink(); ?>" data-post-id="<?php echo esc_attr(get_the_ID()); ?>">
  <div class="c-thumbnail projects__gallery-thumbnail">
    <div class="c-thumbnail__main_img">
      <?php
        $thumb = get_field('post_thumb');
        $img_url = is_array($thumb) ? ($thumb['img-pc'] ?? '') : '';
      ?>
      <?php if ($img_url): ?>
      <img
        src="<?php echo esc_url($img_url); ?>"
        alt="<?php echo esc_attr(get_the_title()); ?>"
      />
      <?php endif; ?>
    </div>
    <div class="c-thumbnail__text-wrapper">
      <div class="c-thumbnail__title f-inter-B">
        <p><?php the_title(); ?></p>
      </div>
      <div class="c-thumbnail__summary f-noto-M">
        <p><?php the_field('post_summary'); ?></p>
      </div>
    </div>
  </div>
</a>
