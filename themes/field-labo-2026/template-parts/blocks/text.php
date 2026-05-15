<?php

$text = get_field('block_text');

if(!$text) {
  return;
}
?>

<?php echo wp_kses_post(str_replace('<p>', '<p class="text-block">', wpautop($text))); ?>
