<?php
$is_fixed = $args['is_fixed'] ?? false;
$all_term = get_term_by('slug','all-photos','categorie');
$all_term = ($all_term && !is_wp_error($all_term)) ? $all_term : null;
$all_label = $all_term ? $all_term->name : 'All Photos';
?>

<div class="topContents__ctrl f-inter-B <?php echo $is_fixed ? 'topContents__ctrl--fixed' : ''; ?>">
  <div class="sort ctrl-item">
    <p class="sort__item ctrl-item--name">sort :</p>
    <select class="sort__lists js-category" name="categorie" required>
      <option class="sort__list" value="all"><?php echo esc_html( $all_label ); ?></option>
      <?php
        $all_terms = get_terms([
          'taxonomy' => 'categorie',
          // 'hide_empty' => false,
          'hide_empty' => true,
          'orderby' => 'name',
          'order' => 'ASC',
          'exclude' => $all_term ? [(int) $all_term->term_id] : [],
        ]);

        if (!is_wp_error($all_terms)) {
          foreach ($all_terms as $term) {
            echo '<option class="sort__list" value="' . esc_attr($term->slug) . '">' . esc_html($term->name) . '</option>';
          }
        }
      ?>
    </select>
    <div class="sort__toggle"></div>
  </div>
  <div class="order ctrl-item">
    <p class="order__item ctrl-item--name">order :</p>
    <div class="order__ctrl js-order">
      <button class="order__ctrl-random order__ctrl-name js-orderBtn is-active" type="button" data-sort="random">random</button>
      <button class="order__ctrl-latest order__ctrl-name js-orderBtn" type="button" data-sort="latest">latest</button>
    </div>
  </div>
</div>
