<?php
$modal_id = $args['modal_id'] ?? '';
$content_class = $args['content_class'] ?? '';
$is_hidden = $args['is_hidden'] ?? false;
?>

<div class="c-modal <?php echo esc_attr($content_class); ?>" id="<?php echo esc_attr($modal_id); ?>" aria-hidden="true"<?php echo $is_hidden ? ' style="display:none;"' : ''; ?>>
  <div class="c-modal__bg js-modalClose" data-id="<?php echo esc_attr($modal_id); ?>"></div>

  <div class="c-modal__container">
    <div class="c-modal__wrapper">
        <div class="c-modal__contents is-over">
          <div class="c-modal__inner-scrlWrap">
            <div class="c-modal__inner" data-type="top">
              <div class="js-modalContent"></div>
              <button class="c-modal__bottom js-modalClose" data-id="<?php echo esc_attr($modal_id); ?>">
                <div class="c-modal__bottom-icon"></div>
                <p class="c-modal__bottom-text f-inter-B">close</p>
              </button>
            </div>
          </div>
          <button class="c-modal__btn js-modalClose" data-id="<?php echo esc_attr($modal_id); ?>">
            <div class="c-modal__btn-inner">
              <div class="c-modal__btn-icon"></div>
            </div>
          </button>
        </div>
      </div>
  </div>
</div>
