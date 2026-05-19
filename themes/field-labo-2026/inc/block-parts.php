<?php
  add_filter('allowed_block_types_all', function($allowed_blocks, $editor_context) {

    // blog / projects 投稿だけ制御
    if(
      !empty($editor_context->post) &&
      in_array($editor_context->post->post_type, ['blog', 'projects'], true)
    ) {

      return [
        // 'core/paragraph',
        // 'core/heading',
        // 'core/list',
        // 'core/image',
        'acf/heading',
        'acf/text',
        'acf/image',
        'acf/table',
        'acf/article-link',
        'acf/columns-2',
        'acf/columns-3',
        'acf/gallery',
        'acf/bordered-block',
      ];
    }

    return $allowed_blocks;

  }, 10, 2);

  add_action('acf/init', function() {

    if (!function_exists('acf_register_block_type')) {
      return;
    }

    acf_register_block_type([
      'name'            => 'text',
      'title'           => 'テキスト',
      'render_template' => get_template_directory() . '/template-parts/blocks/text.php',
      'category'        => 'field-labo',
      'mode'            => 'edit',
      'supports'        => [
        'align' => false,
      ],
    ]);
    acf_register_block_type([
      'name'            => 'heading',
      'title'           => '見出し',
      'render_template' => get_template_directory() . '/template-parts/blocks/heading.php',
      'category'        => 'field-labo',
      'mode'            => 'edit',
      'supports'        => [
        'align' => false,
      ],
    ]);
    acf_register_block_type([
      'name'            => 'image',
      'title'           => '画像',
      // 'description'     => '画像とキャプションのブロック',
      'render_template' => get_template_directory() . '/template-parts/blocks/image.php',
      'category'        => 'field-labo',
      // 'icon'            => 'editor-help',
      'mode'            => 'edit',
      'supports'        => [
        'align' => false,
      ],
    ]);
    acf_register_block_type([
      'name'            => 'table',
      'title'           => 'テーブル',
      'render_template' => get_template_directory() . '/template-parts/blocks/table.php',
      'category'        => 'field-labo',
      'mode'            => 'edit',
      'supports'        => [
        'align' => false,
      ],
    ]);
    acf_register_block_type([
      'name'            => 'article-link',
      'title'           => '記事リンク',
      'render_template' => get_template_directory() . '/template-parts/blocks/article-link.php',
      'category'        => 'field-labo',
      'mode'            => 'edit',
      'supports'        => [
        'align' => false,
      ],
    ]);
    acf_register_block_type([
      'name'            => 'columns-2',
      'title'           => '2列レイアウト',
      'render_template' => get_template_directory() . '/template-parts/blocks/columns-2.php',
      'category'        => 'field-labo',
      'mode'            => 'edit',
      'supports'        => [
        'align' => false,
      ],
    ]);
    acf_register_block_type([
      'name'            => 'columns-3',
      'title'           => '3列レイアウト',
      'render_template' => get_template_directory() . '/template-parts/blocks/columns-3.php',
      'category'        => 'field-labo',
      'mode'            => 'edit',
      'supports'        => [
        'align' => false,
      ],
    ]);
    acf_register_block_type([
      'name'            => 'gallery',
      'title'           => 'ギャラリー',
      'render_template' => get_template_directory() . '/template-parts/blocks/gallery.php',
      'category'        => 'field-labo',
      'mode'            => 'edit',
      'supports'        => [
        'align' => false,
      ],
    ]);
    acf_register_block_type([
      'name'            => 'bordered-block',
      'title'           => '枠線ブロック',
      'render_template' => get_template_directory() . '/template-parts/blocks/bordered-block.php',
      'category'        => 'field-labo',
      'mode'            => 'edit',
      'supports'        => [
        'align' => false,
      ],
    ]);

  });

  add_filter('block_categories_all', function($categories) {

    $categories[] = [
      'slug'  => 'field-labo',
      'title' => 'Field Labo',
    ];

    return $categories;

  });
?>
