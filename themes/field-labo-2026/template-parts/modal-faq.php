<?php
$post_id = $args['post_id'] ?? 0;
$question = get_field('question', $post_id);
?>

<?php if (have_rows('answer', $post_id)) : ?>
  <div class="faqModal" id="faqModal">
    <p class="faqModal__head f-noto-M"><?php echo nl2br(esc_html($question)); ?></p>
    <div class="faqModal__contents f-noto-M">
      <?php while (have_rows('answer', $post_id)) : the_row(); ?>

      <?php if (get_row_layout() === 'answer_text') : ?>
          <p class="faqModal__text"><?php echo wp_kses_post(get_sub_field('text')); ?></p>
        <?php endif; ?>

        <?php if (get_row_layout() === 'answer_img') : ?>
          <?php $img = get_sub_field('img'); ?>
          <?php if ($img) : ?>
            <div class="faqModal__img">
              <picture>
                <source srcset="<?php echo esc_url($img); ?>" type="image/webp">
                <img src="<?php echo esc_url($img); ?>" alt=""/>
              </picture>
            </div>
          <?php endif; ?>
        <?php endif; ?>

      <?php endwhile; ?>
    </div>
  </div>
<?php endif; ?>
