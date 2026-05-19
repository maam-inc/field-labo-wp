<?php get_header(); ?>
      <div class="article">
        <div class="article__wrapper">
          <div class="article__main"> 
            <?php
              $group_field = get_field('common_parts');
              $group_field = is_array($group_field) ? $group_field : [];
              $img_field = $group_field['img_main'] ?? null;
              $img_url = is_array($img_field) ? ($img_field['image'] ?? '') : '';
              $date = $group_field['date'] ?? get_the_date('Y.m.d');
              $title = $group_field['title'] ?? get_the_title();
            ?>
            <!-- 共通メイン画像 -->
            <?php if ($img_url): ?>
            <div class="main_img">
              <img src="<?php echo esc_url($img_url); ?>"/>
            </div>
            <?php endif; ?>
            <!-- 投稿日　 -->
            <p class="date">
              <?php echo esc_html($date); ?>
            </p>
            <!-- 共通タイトル　 -->
            <p class="title">
              <?php echo esc_html($title); ?>
            </p>
            
            <ul class="categorie_wrapper"> 
              <?php
                $terms = get_the_terms(get_the_ID(), 'categorie');
                if ($terms) {
                  $child_terms = [];
                  foreach ($terms as $term) {
                    if ($term->parent != 0) {
                      $child_terms[] = $term;
                    }
                  }
                  foreach ($child_terms as $term) {
                    echo '<li class="categorie"><a href="' . get_term_link($term) . '?view=note">' . $term->name . '</a></li>';
                  }
                }
                // $terms = get_terms('categorie');
                // foreach ( $terms as $term ){
                // echo '<li class="categorie"><a href="'.get_term_link($term->slug,'categorie').'?view=note">'.$term->name.'</a></li>';
                // }
              ?>
            </ul>
          </div>
          <div class="article__contents"> 
            <?php if( have_rows('custom_parts')):?>
              <?php while ( have_rows('custom_parts') ) : the_row();?>
                <!-- ↓↓↓↓↓↓↓↓↓↓↓組み合わせパーツここから↓↓↓↓↓↓↓↓↓↓↓ -->
                <!-- w100写真パーツ -->
                <?php if( get_row_layout() == 'img_full'):?>
                  <div class="full_img">
                      <div class="img">
                        <img src="<?php echo get_sub_field('image'); ?>"/>
                        <div class="btn-wrap">
                          <button class="btn js-modalOpen" data-id="imgModal" data-post="<?php echo esc_attr(get_the_ID()); ?>" data-type="inner" data-img="<?php echo get_sub_field('image'); ?>">
                            <div class="inner"></div>
                          </button>
                        </div>
                      </div>
                    <!-- キャプションがあれば -->
                    <?php if( get_sub_field('cap') ): ?>
                      <div class="cap"><?php echo get_sub_field('cap'); ?></div>
                    <?php endif; ?>
                  </div>                    
                  


                
                  <!-- w狭め写真パーツ -->
                <?php elseif( get_row_layout() == 'img_narrow'):?>
                  <div class="narrow_img">
                    <div class="img">
                      <img src="<?php echo get_sub_field('image'); ?>"/>
                      <div class="btn-wrap">
                        <button class="btn js-modalOpen" data-id="imgModal" data-post="<?php echo esc_attr(get_the_ID()); ?>" data-type="inner" data-img="<?php echo get_sub_field('image'); ?>">
                          <div class="inner"></div>
                        </button>
                      </div>
                    </div>
                    <!-- キャプションがあれば -->
                    <?php if( get_sub_field('cap') ): ?>
                      <div class="cap"><?php echo get_sub_field('cap'); ?></div>
                    <?php endif; ?>
                  </div> 
                
                <!-- 見出し -->
                <?php elseif( get_row_layout() == 'head'):?>
                  <div class="head">
                    <?php the_sub_field('head');?>
                  </div>

                <!-- テキスト -->
                <?php elseif( get_row_layout() == 'text'):?>
                  <div class="text">
                    <?php the_sub_field('text');?>
                  </div>

                <!-- テーブル -->  
                <?php elseif( get_row_layout() == 'data'):?>
                  <div class="data">
                    <table class="table"> 
                      <?php if( have_rows('table')):?>
                        <?php while(have_rows('table')): the_row(); ?>
                        <tr>
                          <td class="table_head"><?php the_sub_field('item'); ?></td>
                          <td class="table_text"><?php the_sub_field('text'); ?></td>
                        </tr>
                        <?php endwhile ?>
                      <?php endif; ?>
                    </table>
                    <div class="img"> <img src="<?php echo the_sub_field('image');?>"/></div>
                  </div>
                <!-- リンク -->
                <?php elseif( get_row_layout() == 'text_link'):?>
                  <?php if( have_rows('links')):?>
                    <div class="links">
                      <?php while(have_rows('links')): the_row(); ?>
                        <?php if(get_sub_field('link')): ?>
                          <?php $group_field = get_sub_field('link');?>
                          <div class="link">
                            <p class="link_name"><?php echo $group_field['link_name']; ?> :&nbsp;</p>
                            <a class="link_url" href="<?php echo $group_field['link_url']; ?>"><?php echo $group_field['link_url']; ?></a>
                          </div>
                        <?php endif; ?>
                      <?php endwhile; ?>
                    </div>
                  <?php endif; ?>
                  
                <!-- 横並び２カラムパーツ -->
                <?php elseif( get_row_layout() == 'columns'):?>
                  <div class="column"> 
                    <?php $group_field = get_sub_field('column_1');?>
                    <div class="column_img--1 column_img">
                      <?php $img_field = $group_field['image'];?>
                      <div class="img">
                        <img src="<?php echo ($img_field); ?>"/>
                        <div class="btn-wrap">
                          <button class="btn js-modalOpen" data-id="imgModal" data-post="<?php echo esc_attr(get_the_ID()); ?>" data-type="inner" data-img="<?php echo esc_url($img_field); ?>">
                            <div class="inner"></div>
                          </button>
                        </div>
                      </div>
                      <?php if($group_field['cap']): ?>
                        <div class="cap"><?php echo $group_field['cap']; ?></div>
                      <?php endif; ?>
                    </div>
                    <?php $group_field = get_sub_field('column_2');?>
                    <div class="column_img--1 column_img">
                      <?php $img_field = $group_field['image'];?>
                      <div class="img">
                        <img src="<?php echo ($img_field); ?>"/>
                        <div class="btn-wrap">
                          <button class="btn js-modalOpen" data-id="imgModal" data-post="<?php echo esc_attr(get_the_ID()); ?>" data-type="inner" data-img="<?php echo ($img_field); ?>">
                            <div class="inner"></div>
                          </button>
                        </div>
                      </div>
                      <?php if($group_field['cap']): ?>
                        <div class="cap"><?php echo $group_field['cap']; ?></div>
                      <?php endif; ?>
                    </div>
                  </div>

                <!-- Before & Afterパーツ -->
                <?php elseif( get_row_layout() == 'before_&_after'):?>
                  <div class="before-after"> 
                    <p class="before-after__head">(  Before & After  )</p>
                    <div class="before-after__wrapper">
                      <!-- グループフィールド　繰り返し ここから-->
                      <?php if( get_sub_field('group') ): ?>
                      <?php
                        $columns = ['before', 'after'];
                        foreach ($columns as $column_key) {
                          if($column_key === 'before') {
                            $class = 'before';
                            $sec = 'Before';
                          } else if($column_key === 'after') {
                            $class = 'after';
                            $sec = 'After';
                          }
                      ?>
                        <div class="<?php echo esc_attr($class); ?>">
                          <p class="before-after__text"><?php echo $sec; ?></p>
                          <div class="article__contents"> 
                            <!-- 柔軟なコンテンツ ここから-->
                            <?php
                              $group_data = get_sub_field('group');
                              $flexible_rows = $group_data[$column_key] ?? [];
                            ?>
                            <?php if( !empty($flexible_rows) ): ?>
                              <?php foreach($flexible_rows as $row): ?>
                                <?php
                                  $layout = $row['acf_fc_layout'] ?? '';
                                ?>

                                <!-- w100写真パーツ -->
                                <?php if( $layout == 'img_full'):?>
                                  <div class="full_img">
                                    <div class="img">
                                      <img src="<?php echo esc_url($row['image']); ?>"/>
                                      <div class="btn-wrap">
                                        <button class="btn js-modalOpen" data-id="imgModal" data-post="<?php echo esc_attr(get_the_ID()); ?>" data-type="inner" data-img="<?php echo esc_url($row['image']); ?>">
                                          <div class="inner"></div>
                                        </button>
                                      </div>
                                    </div>
                                    <?php if( !empty($row['cap']) ): ?>
                                      <div class="cap"><?php echo $row['cap']; ?></div>
                                    <?php endif; ?>
                                  </div>

                                <!-- w狭め写真パーツ -->
                                <?php elseif( $layout == 'img_narrow'):?>
                                  <div class="narrow_img">
                                    <div class="img">
                                      <img src="<?php echo esc_url($row['image']); ?>"/>
                                      <div class="btn-wrap">
                                        <button class="btn js-modalOpen" data-id="imgModal" data-post="<?php echo esc_attr(get_the_ID()); ?>" data-type="inner" data-img="<?php echo esc_url($row['image']); ?>">
                                          <div class="inner"></div>
                                        </button>
                                      </div>
                                    </div>
                                    <?php if( !empty($row['cap']) ): ?>
                                      <div class="cap"><?php echo $row['cap']; ?></div>
                                    <?php endif; ?>
                                  </div>

                                <!-- 見出し -->
                                <?php elseif( $layout == 'head'):?>
                                  <div class="head">
                                    <?php echo $row['head']; ?>
                                  </div>

                                <!-- テキスト -->
                                <?php elseif( $layout == 'text'):?>
                                  <div class="text">
                                    <?php echo $row['text']; ?>
                                  </div>

                                <!-- テーブル -->  
                                <?php elseif( $layout == 'data'):?>
                                  <div class="data">
                                    <table class="table"> 
                                      <?php if( $row['table']):?>
                                        <?php foreach($row['table'] as $table_row): ?>
                                        <tr>
                                          <td class="table_head"><?php echo $table_row['item']; ?></td>
                                          <td class="table_text"><?php echo $table_row['text']; ?></td>
                                        </tr>
                                        <?php endforeach ?>
                                      <?php endif; ?>
                                    </table>
                                    <div class="img"> <img src="<?php echo $row['image'];?>"/></div>
                                  </div>

                                <!-- リンク -->
                                <?php elseif( $layout == 'text_link'):?>
                                  <?php if( !empty($row['links']) ): ?>
                                    <div class="links">
                                      <?php foreach($row['links'] as $link_row): ?>
                                        <?php if( !empty($link_row['link']) ): ?>
                                          <?php $link_group = $link_row['link']; ?>
                                          <div class="link">
                                            <p class="link_name"><?php echo $link_group['link_name']; ?> :&nbsp;</p>
                                            <a class="link_url" href="<?php echo $link_group['link_url']; ?>">
                                              <?php echo $link_group['link_url']; ?>
                                            </a>
                                          </div>
                                        <?php endif; ?>
                                      <?php endforeach; ?>
                                    </div>
                                  <?php endif; ?>

                                <!-- 横並び２カラムパーツ -->
                                <?php elseif( $layout == 'columns'):?>
                                  <div class="column"> 
                                    <?php $col1 = $row['column_1']; ?>
                                    <div class="column_img--1 column_img">
                                      <div class="img">
                                        <img src="<?php echo esc_url($col1['image']); ?>"/>
                                        <div class="btn-wrap">
                                          <button class="btn js-modalOpen" data-id="imgModal" data-post="<?php echo esc_attr(get_the_ID()); ?>" data-type="inner" data-img="<?php echo esc_url($col1['image']); ?>">
                                            <div class="inner"></div>
                                          </button>
                                        </div>
                                      </div>
                                      <?php if( !empty($col1['cap']) ): ?>
                                        <div class="cap"><?php echo $col1['cap']; ?></div>
                                      <?php endif; ?>
                                    </div>
                                    <?php $col2 = $row['column_2']; ?>
                                    <div class="column_img--2 column_img">
                                      <div class="img">
                                        <img src="<?php echo esc_url($col2['image']); ?>"/>
                                        <div class="btn-wrap">
                                          <button class="btn js-modalOpen" data-id="imgModal" data-post="<?php echo esc_attr(get_the_ID()); ?>" data-type="inner" data-img="<?php echo esc_url($col2['image']); ?>">
                                            <div class="inner"></div>
                                          </button>
                                        </div>
                                      </div>
                                      <?php if( !empty($col2['cap']) ): ?>
                                        <div class="cap"><?php echo $col2['cap']; ?></div>
                                      <?php endif; ?>
                                    </div>
                                  </div>

                                <?php endif; ?>
                              <?php endforeach; ?>
                            <?php endif; ?>
                            <!-- 柔軟なコンテンツ ここまで-->
                          </div>
                        </div>
                      <?php
                        }
                      ?>
                      <?php endif; ?>
                      <!-- グループフィールド　繰り返し ここまで-->
                    </div>
                  </div>
                <!-- ↑↑↑↑↑↑↑↑↑↑↑組み合わせパーツここまで↑↑↑↑↑↑↑↑↑↑↑ -->
                <?php endif; ?>
              <?php endwhile; ?>
            <?php endif; ?>
          </div>
        </div>
      </div>
<?php get_footer(); ?>
