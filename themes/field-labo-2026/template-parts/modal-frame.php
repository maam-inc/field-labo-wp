<?php
$modal_id = $args['modal_id'] ?? '';
$content_class = $args['content_class'] ?? '';
?>

<div class="modal <?php echo esc_attr($content_class); ?>" id="<?php echo esc_attr($modal_id); ?>">
  <div class="modal__bg js-modalClose" data-id="<?php echo esc_attr($modal_id); ?>"></div>

  <div class="modal__container">
    <div class="modal__contents">
      <div class="modal__wrapper">
        <div class="modal__inner">
          <div class="js-modalContent"></div>
        </div>
      </div>
    </div>
  </div>

  <button class="modal__btn js-modalClose" data-id="<?php echo esc_attr($modal_id); ?>">
    <div class="btn-close"></div>
  </button>
</div>