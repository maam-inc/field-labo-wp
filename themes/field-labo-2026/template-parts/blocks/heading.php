<?php

$heading = get_field('block_heading');

if (!$heading) {
  return;
}
?>

<h2 class="heading-block">
  <?php echo nl2br(esc_html($heading)); ?>
</h2>
