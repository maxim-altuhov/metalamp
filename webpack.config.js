const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pathDir = {
  src: path.join(__dirname, './#src'),
  dist: path.join(__dirname, './dist'),
  base: path.join(__dirname, './#src/base'),
  comp: path.join(__dirname, './#src/components'),
  pages: path.join(__dirname, './#src/pages')
};
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = ext => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;

const cssLoaders = add => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: (resourcePath, context) => {
          return path.relative(path.dirname(resourcePath), context) + '/';
        }
      }
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
              {
                browsers: 'last 3 versions',
                autoprefixer: {
                  grid: true
                }
              }
            ]
          ]
        }
      }
    },
    {
      loader: 'resolve-url-loader'
    }
  ];

  if (add) {
    loaders.push(add);
  }
  return loaders;
};

const babelOptions = presets => {
  const option = {
    presets: [
      ['@babel/preset-env', {
        useBuiltIns: 'usage',
        corejs: 3
      }]
    ],
    plugins: ['@babel/plugin-proposal-class-properties']
  };
  if (presets) {
    option.presets.push(presets);
  }
  return option;
};

const plugins = () => {
  const pagesDir = pathDir.pages;
  const allPages = fs.readdirSync(pagesDir);
  const base = [
    ...allPages.map((page) => new HTMLWebpackPlugin({
      filename: `${page}.html`,
      template: `${pagesDir}/${page}/${page}.pug`,
      minify: {
        collapseWhitespace: isProd
      },
      inject: 'body',
      scriptLoading: 'blocking'
    })),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, `${pathDir.base}/favicon.png`),
        to: path.resolve(__dirname, 'dist')
      }]
    }),
    new MiniCssExtractPlugin({
      filename: `css/${filename('css')}`
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ];
  if (isDev) {
    base.push(new ESLintPlugin());
  }
  return base;
};

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };
  if (isProd) {
    config.minimize = true;
    config.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};

module.exports = {
  context: path.resolve(__dirname, '#src'),
  mode: 'development',
  entry: {
    main: ['./pages/index/index.js']
    // add: ['./base/js/add.js']
  },
  output: {
    filename: `js/${filename('js')}`,
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.html', '.pug'],
    alias: {
      base: path.resolve(__dirname, '#src/base'),
      fonts: path.resolve(__dirname, '#src/base/fonts'),
      libs: path.resolve(__dirname, '#src/base/libs'),
      page: path.resolve(__dirname, '#src/pages'),
      comp: path.resolve(__dirname, '#src/components')
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    open: true
  },
  target: isDev === true ? 'web' : 'browserslist',
  devtool: isDev === true ? 'source-map' : false,
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.pug$/i,
        loader: 'pug-loader',
        options: {
          pretty: isDev
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.(sass|scss)$/,
        use: cssLoaders({
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            webpackImporter: false
          }
        })
      },
      {
        test: /\.(?:ico|png|jpg|jpeg|svg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions()
        }
      }
    ]
  }
};
