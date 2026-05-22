<?php

$heading = get_field('block_heading');

if (!$heading) {
  return;
}
?>

<h2 class="contents__head f-noto-B"><?php echo nl2br(esc_html($heading)); ?></h2>
