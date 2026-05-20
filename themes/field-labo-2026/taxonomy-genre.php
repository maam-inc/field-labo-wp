<?php get_header(); ?>

      <div class="note" id="note">
        <div class="note__wrapper">
          <p class="note__title">note</p>
          <div class="categorie_container">
            <select class="categorie_wrapper" name="genre" onchange="if(this.value) location.href=this.value;"> 
              <option class="categorie" value="<?php echo esc_url(get_post_type_archive_link('blog')); ?>">ALL</option>
              <?php
                $genres = get_categories( array(
                  'taxonomy' => 'genre',
                  'orderby' => 'name',
                  'order' => 'ASC'
                ));
                $current_term = get_queried_object();
                $current_slug = $current_term->slug;
                if (!is_wp_error($genres)) {
                  foreach( $genres as $genre ) {
                    echo '<option class="categorie" value="' . esc_url(get_term_link($genre)) . '?view=note" ' . ($current_slug === $genre->slug ? 'selected' : '') . '>' . esc_html($genre->name) . '</option>';
                  }
                }
              ?>
            </select>
          </div>
          <ul class="note__articles">
            <?php if(have_posts()): ?>
              <?php while(have_posts()): the_post(); ?>
                <?php $group_field = get_field('common_parts') ?: [];?>
                <li class="note__article">
                  <a href="<?php the_permalink(); ?>">
                    <div class="main_img">
                      <?php $img_field = $group_field['img_main'] ?? [];?>
                      <img src="<?php echo esc_url($img_field['image'] ?? ''); ?>"/>
                    </div>
                    <p class="title"><?php echo esc_html($group_field['title'] ?? get_the_title()); ?></p>
                    <p class="summary"><?php echo wp_kses_post(get_field('summary'));?></p>
                  </a>
                </li>
              <?php endwhile; ?>
            <?php else: ?>
              <li><p>記事はまだありません。</p></li>
            <?php endif; ?>
          </ul>
        </div>
      </div>
<?php get_footer(); ?>
