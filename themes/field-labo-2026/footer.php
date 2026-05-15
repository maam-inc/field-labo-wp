
        <footer class="footer" id="footer">
          <div class="footer__inner"><a href="<?php the_permalink() ?>">
              <h1 class="footer__logo">FILED LABO </h1></a>
            <p class="footer__address">〒205-0014 東京都羽村市羽東2-2-3</p>
            <p class="footer__email">shigeho.s@field-labo.com</p>
            <p class="footer__copyright">© 2016 - FIELD LABO All Rights Reserved.</p>
          </div>
        </footer>
      </div>
      <?php 
        // if (is_front_page()) {
        //   locate_template('top-modal.php', true);
        // }

        if (is_post_type_archive('faq')) {
          locate_template('modal-faq.php', true);
        }
        else if (is_singular(['project', 'note'])) {
          locate_template('modal-img.php', true);
        }
        else if (is_front_page()) {
          locate_template('modal-inspo.php', true);
        } 
        else if(is_tax('categorie')){
          locate_template('modal-inspo.php', true);
        }
        // 共通
        locate_template('modal-hbg.php', true);
      ?>
    </div>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/common.js"></script>
    <?php
      $asset_type = function_exists('get_asset_type') ? get_asset_type() : 'page';
    ?>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/<?php echo esc_attr($asset_type); ?>.js"></script>
  <?php wp_footer();?>
  </body>
</html>