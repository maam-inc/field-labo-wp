<?php
$modal_id = $args['modal_id'] ?? '';
$content_class = $args['content_class'] ?? '';
$is_hidden = $args['is_hidden'] ?? false;
?>

<div class="l-modal <?php echo esc_attr($content_class); ?>" id="<?php echo esc_attr($modal_id); ?>">
  <div class="js-modalLoading"></div>
  <div class="l-modal__bg btn-close js-modalClose"></div>
  <div class="l-modal__container">
    <div class="l-modal__wrapper">
      <div class="l-modal__inner js-modalContent">
        <!-- ここにコンテンツを挿入 -->
        <button class="l-modal__bottom btn-close js-modalClose" type="button">
          <div class="l-modal__bottom-icon"></div>
          <p class="l-modal__bottom-text f-inter-B">close</p>
        </button>
      </div>
    </div>
    <button class="c-modalCloseIcon__btn btn-close l-modal__btn js-modalClose" type="button">
      <div class="c-modalCloseIcon__btn-inner">
        <div class="c-modalCloseIcon__btn-icon"></div>
      </div>
    </button>
  </div>
</div>
