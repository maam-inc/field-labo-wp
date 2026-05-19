const {
  src, dest, watch, series, parallel,
} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const notifier = require('node-notifier');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssdeclsort = require('css-declaration-sorter');
const sassGlob = require('gulp-sass-glob');
const gcmq = require('gulp-group-css-media-queries');

const browserSync = require('browser-sync');
// const rename = require('gulp-rename');

const minimist = require('minimist');

const options = minimist(process.argv.slice(2), {
  string: 'env',
  default: { env: 'development' },
});

const PROD = options.env === 'build';
const BREAKPOINT = 768;
const PROTOCOL = 'http';
const SERVER_NAME = 'field-labo.com';
// const SERVER_NAME = 'www.beams.co.jp';

const DIR = '';
const WP_THEME_NAME = 'field-labo-2026';
const ASSET_DIR = '/themes/' + WP_THEME_NAME;

const CSS_DIR = `/assets/css/`;
const JS_DIR = `/assets/js/`;
const IMG_DIR = `/assets/images/`;

const DUMMY_DIR = `/uploads/dummy/`;


const HTML_ROOT = './static/';
const ASSET_ROOT = './themes/' + WP_THEME_NAME;
const HOST_NAME = `${PROTOCOL}://${SERVER_NAME}`;
const CANONICAL_ROOT = `${HOST_NAME}/${DIR}`;
const INDEX_DIR = `${HTML_ROOT}${DIR}`;

// NOTE: アロー関数にすると `this` がストリームを指さず、
// gulp-plumber がエラー時に `compileSass` を終了できずハングし、
// 以降の watch が死ぬ（毎回 yarn start し直す羽目になる）。
// 通常関数にして `this.emit('end')` でストリームを必ず閉じる。
function errorHandler(error) {
  notifier.notify(
    {
      title: 'エラー発生！',
      message: error.message,
      sound: true,
    },
    () => {
      console.log(error.message);
    },
  );
  // ストリームを正常終了させ、watch を生かし続ける
  if (this && typeof this.emit === 'function') {
    this.emit('end');
  }
}

const compilePug = (done) => {
  return src(
    [
      // 'src/pug/**.pug',
      // 'src/pug/**/*.pug',
      // 'src/pug/**/**/*.pug',
      'src/pug/dir/**/*.pug',
      '!src/pug/_*/*.pug',
      '!src/pug/_*/**/*.pug',
      '!src/pug/**/_*/**.pug',
    ],
    {
      base: 'src/pug/dir',
      sourcemaps: PROD ? false : true
    },
  )
    .pipe(plumber({ errorHandler }))
    .pipe(
      pug({
        pretty: true,
        locals: {
          PROD,
          DIR,
          CSS_DIR: `${ASSET_DIR}${CSS_DIR}`,
          JS_DIR: `${ASSET_DIR}${JS_DIR}`,
          IMG_DIR: `${ASSET_DIR}${IMG_DIR}`,
          DUMMY_DIR: `${DUMMY_DIR}`,
          BREAKPOINT,
          CANONICAL_ROOT,
          now: new Date(),
        },
      }),
    )
    // .pipe(rename(path => path.extname = '.php'))
    .pipe(dest(INDEX_DIR /* { sourcemaps: './sourcemaps'} */));
};


const compileSass = (done) => {
  const postcssPlugins = [
    autoprefixer({
      cascade: false,
    }),
    cssdeclsort({ order: 'alphabetical' /* smacss, concentric-css */ }),
  ];
  return src([
    'src/scss/**/*.scss',
    '!src/scss/_*/**.scss',
    '!src/scss/_*/**/**.scss',
    '!src/scss/**/_*/**.scss',
  ], { sourcemaps: false })
    .pipe(plumber({ errorHandler }))
    .pipe(sassGlob())
    .pipe(sass({
      // fiber: fibers,
      outputStyle: 'compressed',
    }))
    .pipe(postcss(postcssPlugins))
    .pipe(gcmq())
    // .pipe(cleanCSS({ rebase: false }))
    .pipe(dest(`${ASSET_ROOT}${CSS_DIR}`) /* , { sourcemaps: './sourcemaps'} */);
};

const buildServer = (done) => {
  const PORT = 3000;

  browserSync({
    files: HTML_ROOT + '/**/*',
    startPath: DIR,
    // reloadDelay: WATCH_INTERVAL,
    server: {
      baseDir: [HTML_ROOT, './'] // 静的HTMLと /themes 配下のアセットを配信
    }
  });

  done();
};

const browserReload = (done) => {
  browserSync.reload();
  done();
};

const watchFiles = (done) => {
  watch(['src/pug/**/*.pug'], series(compilePug, browserReload));
  // watch(['./scss/**/*.scss'], series(compileSass, browserStream));
  watch(['src/scss/**/*.scss','src/scss/**/*.sass'], series(compileSass, browserReload));
  watch(['src/js/**/*.js'], series(browserReload));
  done();
};

if (PROD) {
  exports.default = series(
    parallel(compilePug, compileSass),
  );
} else {
  exports.default = series(
    parallel(compilePug, compileSass),
    parallel(buildServer, watchFiles),
  );
}
