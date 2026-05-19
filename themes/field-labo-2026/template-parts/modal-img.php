
    <?php
      if(!isset($query)){
        $paged = get_query_var('paged') ?: 1;

        $args = [
          'post_type' => ['blog','projects'],
          'posts_per_page' => -1,
          'paged' => $paged,
          'orderby' => 'rand',
        ];          
      }
    ?>
    <?php $query = new WP_Query($args);?>
      <div class="modal imgModal" id="imgModal">
        <div class="modal__bg js-modalClose" data-id="imgModal">
          <div class="modal__container">
            <div class="modal__contents">
              <div class="modal__wrapper"> 
                <div class="modal__inner">
                  <button class="modal__btn js-modalClose" data-id="imgModal" >
                    <div class="btn-close">×</div>
                  </button>
                  <div class="js-modalContent"></div>
                  <?php if($query->have_posts()): ?>
                    <?php while($query->have_posts()): $query->the_post(); ?>
                      <?php
                        // 投稿タイプを取得
                        $ptype_obj = get_post_type_object(get_post_type());
                        $genre_label = $ptype_obj ? $ptype_obj->labels->singular_name : '';

                        $post_ids = [get_the_ID()];
                        $terms = wp_get_object_terms($post_ids, 'categorie');
                        $child_terms = [];
                        if (!is_wp_error($terms)) {
                          foreach ($terms as $term) {
                            if ($term->parent != 0) {
                              $child_terms[$term->term_id] = $term;
                            }
                          }
                        }
                      ?>
                      <div class="img-data data" data-post="<?php echo esc_attr(get_the_ID()); ?>" style="display:none;">  

                        <?php if(have_rows('custom_parts')): ?>
                          <?php while(have_rows('custom_parts')): the_row(); ?>
                            <?php  $row_layout = get_row_layout();?>
                            <?php if($row_layout === 'img_full' || $row_layout === 'img_narrow'): ?>
                              <div class="inspo-layout inspo-layout--inner" data-img="<?php echo get_sub_field('image'); ?>" style="display:none;">
                                <div class="img"><img src="<?php echo get_sub_field('image'); ?>" alt=""></div>
                                <ul class="categorie_wrapper">
                                  <?php foreach ($child_terms as $term) : ?>
                                    <li class="categorie"><a href="<?php echo esc_url(get_term_link($term)); ?>?view=top"><?php echo esc_html($term->name); ?></a></li>
                                  <?php endforeach; ?>
                                </ul>
                              </div>
                            <?php elseif($row_layout === 'columns'): ?>
                              <?php
                                $columns = ['column_1', 'column_2'];
                                foreach ($columns as $column_key) {
                                  $wrap_field = get_sub_field($column_key);
                                  $img_raw = $wrap_field['image'] ?? null;
                                  $img_url = $img_raw;
                              ?>
                              <div class="inspo-layout inspo-layout--inner" data-img="<?php echo esc_attr($img_url); ?>" style="display:none;">
                                <div class="img"><img src="<?php echo esc_attr($img_url); ?>" alt=""></div>
                                <ul class="categorie_wrapper">
                                  <?php foreach ($child_terms as $term) : ?>
                                    <li class="categorie"><a href="<?php echo esc_url(get_term_link($term)); ?>?view=top"><?php echo esc_html($term->name); ?></a></li>
                                  <?php endforeach; ?>
                                </ul>
                              </div>
                              <?php
                                }
                              ?>
                            <?php elseif($row_layout === 'before_&_after'): ?>
                              <?php if( get_sub_field('group') ): ?>
                              <?php

                                $columns = ['before', 'after'];
                                foreach ($columns as $column_key) {
                              ?>
                              <?php
                                $group_data = get_sub_field('group');
                                $flexible_rows = $group_data[$column_key] ?? [];
                              ?>
                              <?php foreach($flexible_rows as $row): ?>
                                <?php $layout = $row['acf_fc_layout'] ?? ''; ?>
                                <?php if( $layout == 'img_full' || $layout == 'img_narrow' ):?>
                                  <div class="inspo-layout inspo-layout--inner" data-img="<?php echo esc_url($row['image']); ?>" style="display:none;">
                                    <div class="img"><img src="<?php echo esc_url($row['image']); ?>" alt=""></div>
                                    <ul class="categorie_wrapper">
                                      <?php foreach ($child_terms as $term) : ?>
                                        <li class="categorie"><a href="<?php echo esc_url(get_term_link($term)); ?>?view=top"><?php echo esc_html($term->name); ?></a></li>
                                      <?php endforeach; ?>
                                    </ul>
                                  </div>  
                                <?php elseif( $layout == 'columns' ):?>
                                  <?php $col1 = $row['column_1']; ?>
                                  <div class="inspo-layout inspo-layout--inner" data-img="<?php echo esc_url($col1['image']); ?>" style="display:none;">
                                    <div class="img"><img src="<?php echo esc_url($col1['image']); ?>" alt=""></div>
                                    <ul class="categorie_wrapper">
                                      <?php foreach ($child_terms as $term) : ?>
                                        <li class="categorie"><a href="<?php echo esc_url(get_term_link($term)); ?>?view=top"><?php echo esc_html($term->name); ?></a></li>
                                      <?php endforeach; ?>
                                    </ul>
                                  </div>  
                                  <?php $col2 = $row['column_2']; ?>
                                  <div class="inspo-layout inspo-layout--inner" data-img="<?php echo esc_url($col2['image']); ?>" style="display:none;">
                                    <div class="img"><img src="<?php echo esc_url($col2['image']); ?>" alt=""></div>
                                    <ul class="categorie_wrapper">
                                      <?php foreach ($child_terms as $term) : ?>
                                        <li class="categorie"><a href="<?php echo esc_url(get_term_link($term)); ?>?view=top"><?php echo esc_html($term->name); ?></a></li>
                                      <?php endforeach; ?>
                                    </ul>
                                  </div>                                    
                                <?php endif; ?>
                              <?php endforeach; ?>
                              <?php
                                }
                              ?>
                              <?php endif; ?>
                            <?php endif; ?>
                          <?php endwhile; ?>
                        <?php endif; ?>
                      </div>
                    <?php endwhile; ?>
                  <?php endif; ?>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
