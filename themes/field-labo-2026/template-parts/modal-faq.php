<?php
$post_id = $args['post_id'] ?? 0;
?>

<?php if (have_rows('answer', $post_id)) : ?>
  <div class="faq-answer">
    <?php while (have_rows('answer', $post_id)) : the_row(); ?>

      <?php if (get_row_layout() === 'answer_text') : ?>
        <div class="faq-answer__text">
          <?php echo get_sub_field('text'); ?>
        </div>
      <?php endif; ?>

      <?php if (get_row_layout() === 'answer_img') : ?>
        <?php $img = get_sub_field('img'); ?>

        <?php if ($img) : ?>
          <div class="faq-answer__img">
            <img src="<?php echo esc_url($img); ?>" alt="">
          </div>
        <?php endif; ?>

      <?php endif; ?>

    <?php endwhile; ?>
  </div>
<?php endif; ?>