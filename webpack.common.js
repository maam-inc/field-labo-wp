const webpack = require('webpack');
const path = require('path');
const  glob = require("glob");
// const TerserPlugin = require("terser-webpack-plugin");

const WP_THEME_NAME = 'field-labo-2026';

const SRC_PATH = path.resolve(__dirname, 'src/js');
const DIST_PATH = path.resolve(__dirname, `themes/${WP_THEME_NAME}/assets/js/`);

const entries = glob.sync("**/*.js", {
  ignore: ["_*/**.js", "**/_*/**.js", "_*/**/**.js"],
  cwd: SRC_PATH,
}).map(key => {
  return [key, path.resolve(SRC_PATH, key)]// [ '**/*.js' , './src/**/*.js' ]という形式の配列になる
}).reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },

  entry: entries,

  // ファイルの出力設定
  output: {
    // 出力ファイル名
    path: DIST_PATH,
    filename: "[name]"
  },

  watchOptions: {
    ignored: /node_modules/,
  },

  // babel
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
            ],
          }
        }
      }
    ]
  },
};
