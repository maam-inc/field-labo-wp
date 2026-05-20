<?php

  // ------------------------------
  // ACFパーツのカスタム
  // ------------------------------
  // リンクのみのウィジウィグエディタ作成
  add_filter('acf/fields/wysiwyg/toolbars', function($toolbars) {
    $toolbars['Link Only'] = [];
    $toolbars['Link Only'][1] = ['link','unlink'];

    return $toolbars;
  });

?>
