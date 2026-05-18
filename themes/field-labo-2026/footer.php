
        <!-- Footer -->
        <footer class="l-footer" id="l-footer">
          <ul class="c-sns l-footer__sns type-footer">
            <li><a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-instagram.svg" alt="instagram"/></a></li>
            <li><a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-facebook.svg" alt="facebook"/></a></li>
            <li><a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-pinterest.svg" alt="pinterest"/></a></li>
            <li><a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-home.svg" alt="home"/></a></li>
          </ul>
          <p class="l-footer__copyright f-inter-B">©FIELD LABO  ALL RIGHTS RESERVED.</p>
          <div class="l-footer__top">
            <div class="c-toTop">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.595 33.595">
                <rect class="cls-2" width="33.595" height="33.595"/>
                <polygon class="cls-1" points="21.774 18.725 16.797 13.749 11.821 18.724 10.835 17.738 16.797 11.775 22.76 17.737 21.774 18.725"/>
                <rect class="cls-1" x="16.099" y="12.762" width="1.396" height="10.938"/>
                <rect class="cls-1" x="10.987" y="9.196" width="11.62" height="1.396"/>
              </svg>
            </div>
          </div>
        </footer>

      </div>
    </div>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/common.js"></script>
    <?php
      $asset_type = function_exists('get_asset_type') ? get_asset_type() : 'page';
    ?>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/<?php echo esc_attr($asset_type); ?>.js"></script>
    <?php wp_footer();?>
  </body>
</html>