'use strict';

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const {
  ALL
} = require('dns');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = add => {
  const loaders = [{
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    'css-loader',
  ];

  if (add) {
    loaders.push(add);
  }

  return loaders;
};

const babelOptions = presets => {
  const option = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  };

  if (presets) {
    option.presets.push(presets);
  }

  return option;
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

//оптимизация финального бандла
const optimization = () => {
  const config = {
    // общие данные выводятся в отдельный файл
    // splitChunks: {
    //   chunks: 'all'
    // }
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }
  return config;
};

module.exports = {
  context: path.resolve(__dirname, '#src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js'],
    // add: ['@babel/polyfill','./base/js/add.js']
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    // extensions: ['.js'] // форматы файлов
    alias: {
      '@base': path.resolve(__dirname, '#src/base'),
      '@page': path.resolve(__dirname, '#src/pages'),
      '@comp': path.resolve(__dirname, '#src/components'),
      '@': path.resolve(__dirname, '#src')
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    open: true
  },
  devtool: isDev === true ? 'source-map' : false,
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      },
      inject: 'body',
      scriptLoading: 'blocking'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '#src/favicon.png'),
        to: path.resolve(__dirname, 'dist')
      }]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.(sass|scss)$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|svg|gif|webp}$)/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot}$)/,
        use: ['file-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript')
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react')
        }
      }
    ]
  }
};