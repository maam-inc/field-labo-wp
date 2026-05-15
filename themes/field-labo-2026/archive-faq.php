<?php get_header(); ?>
<?php
  // $args = array(
  //   'numberposts' => -1,
  //   'post_type' => 'faq'
  // );
  $args = [
    'post_type' => 'faq',
    'posts_per_page' => -1,
    'post_status' => 'publish',
    'orderby' => 'menu_order',
    'order' => 'ASC',
  ];

  $faq_query = new WP_Query($args);
?>         
<div class="faq" id="faq">
  <div class="faq__wrapper"> 
    <p class="faq__title">FAQ</p>
    <p class="faq__text">フィールドラボ のリノベーションについてよくある質問形式にまとめてみました。</p>
    <ul class="faq__items">
      <?php
        if ($faq_query->have_posts()) :
        while ($faq_query->have_posts()) :
        $faq_query->the_post();
      ?>   
        <li class="faq__item">
          <div class="question">
            <div class="btn-wrap">
              <!-- <button class="btn js-modalOpen" data-id="faqModal"> -->
              <button class="btn js-modalOpen" data-id="faqModal" data-post="<?php the_ID(); ?>">
                <div class="inner">
                  <p><?php echo esc_html(get_field('question'));?></p>
                </div>
              </button>
            </div>
          </div>
        </li>
      <?php endwhile; ?>
      <?php endif; ?>
      <?php wp_reset_postdata();?>
    </ul>
  </div>
</div>
<?
get_template_part('template-parts/modal-frame', null, [
  'modal_id' => 'faqModal',
  'content_class' => 'faqModal',
]);
?>
<?php get_footer(); ?>