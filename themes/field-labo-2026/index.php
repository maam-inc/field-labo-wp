<?php get_header(); ?>

<main class="l-content">
  <div class="l-content__wrapper">
    <?php if (have_posts()) : ?>
      <?php while (have_posts()) : the_post(); ?>
        <article <?php post_class(); ?>>
          <h1><?php the_title(); ?></h1>
          <div>
            <?php the_content(); ?>
          </div>
        </article>
      <?php endwhile; ?>
    <?php else : ?>
      <p>記事が見つかりませんでした。</p>
    <?php endif; ?>
  </div>
</main>

<?php get_footer(); ?>
