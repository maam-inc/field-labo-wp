<?php get_header(); ?>
      <?php
        if(!isset($query)){
          $query = new WP_Query([
            'post_type' => 'note',
            'posts_per_page' => 6,
          ]);
        }
      ?>
      <div class="note" id="note">
        <div class="note__wrapper">
          <p class="note__title">note</p>
          <div class="categorie_container">
            <select class="categorie_wrapper" name="genre" onchange="if(this.value) location.href=this.value;"> 
              <option class="categorie" value="<?php echo get_post_type_archive_link('note'); ?>">ALL</option>
              <?php
                $genres = get_categories( array(
                  'taxonomy' => 'genre',
                  'orderby' => 'name',
                  'order' => 'ASC'
                ));
                foreach( $genres as $genre ) {
                  echo '<option class="categorie" value="' . esc_url(get_term_link($genre)) . '?view=note">' . esc_html($genre->name) . '</option>';
                }
              ?>
            </select>
          </div>

          <ul class="note__articles">
            <?php if($query->have_posts()): ?>
              <?php while($query->have_posts()): $query->the_post(); ?>
                <?php $group_field = get_field('common_parts');?>
                <li class="note__article">
                  <a href="<?php the_permalink(); ?>">
                    <div class="main_img">
                      <?php $img_field = $group_field['img_main'];?>
                      <img src="<?php echo $img_field['image']; ?>"/>
                    </div>
                    <p class="title"><?php echo $group_field['title']; ?></p>
                    <p class="summary"><?php echo get_field('summary');?></p>
                  </a>
                </li>
              <?php endwhile; ?>
            <?php else: ?>
              <li><p>記事はまだありません。</p></li>
            <?php endif; ?>
            <?php wp_reset_postdata(); ?>
          </ul>
          <!-- <ul class="note__articles">
            <?php $args = array(
              'taxonomy' => 'categorie',
              'numberposts' => 6,
              'post_type' => 'note',
            );?>
            <?php $posts = get_posts( $args );?>
              <?php if( $posts ) : foreach( $posts as $post ) : setup_postdata( $post ); ?>
                <?php $group_field = get_field('common_parts');?>
                <li class="note__article">
                  <a href="<?php the_permalink(); ?>">
                    <div class="main_img">
                      <?php $img_field = $group_field['img_main'];?>
                      <img src="<?php echo $img_field['image']; ?>"/>
                    </div>
                    <p class="title"><?php echo $group_field['title']; ?></p>
                    <p class="summary"><?php echo get_field('summary');?></p>
                  </a>
                </li>
              <?php endforeach; ?>
              <?php else :?>
                <li>
                    <p>記事はまだありません。</p>
                </li>
              <?php endif;?>
            <?php wp_reset_postdata();?>
          </ul> -->
        </div>
      </div>
<?php get_footer(); ?>