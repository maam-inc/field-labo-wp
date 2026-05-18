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
      <main class="content">
        <div class="content__wrapper">
          <div class="c-breadcrumbs">
            <div class="c-breadcrumbs__item">
              <a class="c-breadcrumbs__page f-inter-B" href="<?php echo home_url('about'); ?>">ABOUT & CONTACT</a>
            </div>
            <div class="c-breadcrumbs__item">
              <h1 class="c-breadcrumbs__page f-inter-B">FAQ</h1>
            </div>
          </div>

          <div class="faq modalOpenBg" id="faq">
            <div class="faq__wrapper">
              <div class="faq__title-group">
                <h2 class="faq__title f-inter-B">faq</h2>
                <p class="faq__text f-noto-T">フィールドラボのリノベーションについて<br class="sp">よくある質問形式にまとめてみました。</p>
              </div>
              <div class="faq__items">
                <?php
                  if ($faq_query->have_posts()) :
                  while ($faq_query->have_posts()) :
                  $faq_query->the_post();
                ?>
                  <div class="faq__item">
                    <div class="question">
                      <button class="question__button" data-post="<?php the_ID(); ?>">
                        <p class="question__text f-noto-T"><?php echo esc_html(get_field('question'));?></p><span class="question__icon"></span>
                      </button>
                    </div>
                  </div>
                <?php endwhile; ?>
                <?php endif; ?>
                <?php wp_reset_postdata();?>
              </div>

              <div class="faq__return">
                <a class="faq__return-link" href="<?php echo home_url('about'); ?>">
                  <div class="icon"></div>
                  <div class="text f-inter-B">about & contact</div></a>
                </div>
            </div>
          </div>
        </div>
      </main>
<?
get_template_part('template-parts/modal-frame', null, [
  'modal_id' => 'faqModal',
  'content_class' => 'faqModal',
]);
?>
<?php get_footer(); ?>