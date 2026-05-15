      <div class="modal hbgModal" id="hbgModal">
        <div class="modal__bg js-modalClose" data-id="hbgModal">
          <div class="modal__container">
            <div class="modal__contents">
              <div class="modal__wrapper"> 
                <div class="modal__inner">
                  <button class="modal__btn js-modalClose" data-id="hbgModal">
                    <div class="btn-close">×</div>
                  </button>
                  <a class="modal__contact" href="">
                    <p class="modal__contact-text">contact </p>
                    <div class="modal__contact-arrow">→</div>
                  </a>
                  <nav class="modal__nav">
                    <a href="<?php echo home_url(); ?>">Top</a>
                    <a href="<?php echo get_post_type_archive_link('project'); ?>">Project</a>
                    <a href="<?php echo get_post_type_archive_link('note'); ?>#">Note</a>
                    <a href="<?php echo get_page_link(314);?>">About</a>
                    <a href="<?php echo get_post_type_archive_link('faq'); ?>">FAQ</a>
                  </nav>
                  <ul class="modal__sns"> 
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Pinterest</a></li>
                    <li><a href="#">Facebook  </a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>