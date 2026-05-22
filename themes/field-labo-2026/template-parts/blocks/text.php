<?php

$text = get_field('block_text');

if(!$text) {
  return;
}

$text = wpautop($text);
$text = preg_replace('#</p>\s*<p>#', '<br><br>', $text);
$text = preg_replace('#^\s*<p>\s*#', '', $text);
$text = preg_replace('#\s*</p>\s*$#', '', $text);
$text = preg_replace('#<br\s*/?>#i', '<br>', $text);

$allowed_tags = [
  'a' => [
    'href'   => true,
    'target' => true,
    'rel'    => true,
    'title'  => true,
  ],
  'br' => [],
];
?>

<p class="contents__text f-noto-M"><?php echo wp_kses($text, $allowed_tags); ?></p>
