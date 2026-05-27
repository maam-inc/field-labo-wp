<?php if (!have_rows('block_table')) return; ?>

<div class="contents__table">
  <dl class="contents__table-body">
    <?php while (have_rows('block_table')) : the_row(); ?>
      <?php
      $item = get_sub_field('item');
      $desc = get_sub_field('desc');
      ?>
      <dt class="contents__table-head f-noto-B"><?php echo esc_html($item); ?></dt>
      <dd class="contents__table-text f-noto-M"><?php echo wp_kses_post($desc); ?></dd>
    <?php endwhile; ?>
  </dl>
</div>