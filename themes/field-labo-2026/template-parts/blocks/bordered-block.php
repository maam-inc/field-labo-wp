<?php

$bordered_block = get_field('block_bordered_block');

if (!$bordered_block) {
  return;
}
?>

<div class="bordered-block">
  <?php echo wp_kses_post($bordered_block); ?>
</div>
