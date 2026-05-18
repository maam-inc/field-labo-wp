<?php
$modal_id = $args['modal_id'] ?? '';
$content_class = $args['content_class'] ?? '';
$is_hidden = $args['is_hidden'] ?? false;
?>

<div class="c-modal <?php echo esc_attr($content_class); ?>" id="<?php echo esc_attr($modal_id); ?>" aria-hidden="true"<?php echo $is_hidden ? ' style="display:none;"' : ''; ?>>
  <div class="c-modal__bg js-modalClose"></div>

  <div class="c-modal__container">
    <div class="c-modal__wrapper">
        <div class="c-modal__contents">
          <div class="c-modal__inner-scrlWrap">
            <div class="c-modal__inner" data-type="top">
              <div class="js-modalContent">
                <!-- ここにコンテンツを挿入 -->
              </div>
              <button class="c-modal__bottom js-modalClose">
                <div class="c-modal__bottom-icon"></div>
                <p class="c-modal__bottom-text f-inter-B">close</p>
              </button>
            </div>
          </div>
          <button class="c-modal__btn js-modalClose">
            <div class="c-modal__btn-inner">
              <div class="c-modal__btn-icon"></div>
            </div>
          </button>
        </div>
      </div>
  </div>
</div>
