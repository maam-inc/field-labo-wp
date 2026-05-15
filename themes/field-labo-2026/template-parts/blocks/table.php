<?php if (!have_rows('block_table')) return; ?>

<dl class="table">
  <?php while (have_rows('block_table')) : the_row(); ?>
    <?php
    $item = get_sub_field('item');
    $desc = get_sub_field('desc');
    ?>
    <dt><?php echo esc_html($item); ?></dt>
    <dd><?php echo wp_kses_post($desc); ?></dd>
  <?php endwhile; ?>
</dl>
