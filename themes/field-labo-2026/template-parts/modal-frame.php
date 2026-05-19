<?php
$modal_id = $args['modal_id'] ?? '';
$content_class = $args['content_class'] ?? '';
$is_hidden = $args['is_hidden'] ?? false;
?>

<div class="l-modal <?php echo esc_attr($content_class); ?>" id="<?php echo esc_attr($modal_id); ?>" aria-hidden="true"<?php echo $is_hidden ? ' style="display:none;"' : ''; ?>>
  <div class="l-modal__bg btn-close js-modalClose" data-id="<?php echo esc_attr($modal_id); ?>"></div>
  <div class="l-modal__container">
    <div class="l-modal__wrapper">
      <div class="l-modal__contents is-over">
        <div class="l-modal__inner-scrlWrap">
          <div class="l-modal__inner">
            <div class="js-modalContent">
              <!-- ここにコンテンツを挿入 -->
            </div>
            <button class="l-modal__bottom btn-close js-modalClose" type="button" data-id="<?php echo esc_attr($modal_id); ?>">
              <div class="l-modal__bottom-icon"></div>
              <p class="l-modal__bottom-text f-inter-B">close</p>
            </button>
          </div>
        </div>
        <button class="l-modal__btn btn-close js-modalClose" type="button" data-id="<?php echo esc_attr($modal_id); ?>">
          <div class="l-modal__btn-inner">
            <div class="l-modal__btn-icon"></div>
          </div>
        </button>
      </div>
    </div>
  </div>
</div>
