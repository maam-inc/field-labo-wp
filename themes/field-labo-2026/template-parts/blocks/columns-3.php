<?php

$first_column = get_field('block_first_column');
$second_column = get_field('block_second_column');
$third_column = get_field('block_third_column');

if (!$first_column && !$second_column && !$third_column) {
  return;
}
?>

<div class="columns-3-block">
  <div class="columns-3-block__item">
    <?php echo wp_kses_post($first_column); ?>
  </div>
  <div class="columns-3-block__item">
    <?php echo wp_kses_post($second_column); ?>
  </div>
  <div class="columns-3-block__item">
    <?php echo wp_kses_post($third_column); ?>
  </div>
</div>
