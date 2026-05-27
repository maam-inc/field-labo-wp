<?php get_header(); ?>
<main class="faq" id="faq">
  <div class="l-content">
    <div class="l-content__wrapper">
      <div class="c-breadcrumbs">
        <div class="c-breadcrumbs__item">
          <a class="c-breadcrumbs__page f-inter-B" href="<?php echo esc_url(home_url('about-contact')); ?>">ABOUT & CONTACT</a>
        </div>
        <div class="c-breadcrumbs__item">
          <h1 class="c-breadcrumbs__page f-inter-B">FAQ</h1>
        </div>
      </div>
      <div class="faq" id="faq">
        <div class="faq__wrapper">
          <div class="faq__title-group">
            <h2 class="faq__title f-inter-B">FAQ</h2>
            <p class="faq__text f-noto-M">フィールドラボのリノベーションについて<br class="sp">よくある質問形式にまとめてみました。</p>
          </div>

          <div class="faq__items">
            <?php
              if (have_posts()) :
              while (have_posts()) :
              the_post();
            ?>
            <button
              class="faq__item js-modalOpen"
              type="button"
              data-post="<?php the_ID(); ?>"
              data-id="faqModal"
            >
              <div class="question">
                <div class="question__button btn-open">
                  <p class="question__text f-noto-B"><?php echo esc_html(get_field('question'));?></p>
                  <div class="question__icon"></div>
                </div>
              </div>
            </button>
            <?php endwhile; ?>
            <?php endif; ?>
          </div>
          <div class="faq__return">
            <a class="faq__return-link" href="<?php echo esc_url(home_url('about-contact')); ?>">
              <div class="icon"></div>
              <div class="text f-inter-B">ABOUT & CONTACT</div></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
<?php
get_template_part('template-parts/modal-frame', null, [
  'modal_id' => 'faqModal',
  'content_class' => 'faqModal',
]);
?>
<?php get_footer(); ?>
