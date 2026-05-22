<?php if (!have_rows('block_table')) return; ?>

<dl class="table">
  <?php while (have_rows('block_table')) : the_row(); ?>
    <?php
    $item = get_sub_field('item');
    $desc = get_sub_field('desc');
    ?>
    <dt class="table__head f-noto-B"><?php echo esc_html($item); ?></dt>
    <dd class="table__text f-noto-M"><?php echo wp_kses_post($desc); ?></dd>
  <?php endwhile; ?>
</dl>
