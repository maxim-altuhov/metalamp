const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
    'css-loader',
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
  const base = [
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
    main: ['./index.js']
    // add: ['./base/js/add.js']
  },
  output: {
    filename: `js/${filename('js')}`,
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    // extensions: ['.js', '.json', '.html'], // форматы файлов
    alias: {
      '@base': path.resolve(__dirname, '#src/base'),
      '@fonts': path.resolve(__dirname, '#src/base/assets/fonts'),
      '@img': path.resolve(__dirname, '#src/base/assets/img'),
      '@page': path.resolve(__dirname, '#src/pages'),
      '@comp': path.resolve(__dirname, '#src/components')
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
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.(sass|scss)$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(?:ico|png|jpg|jpeg|svg|gif|webp)$/,
        loader: 'file-loader',
        options: {
          outputPath: '@img',
          name() {
            if (isDev) {
              return '[name].[ext]';
            }
            return '[name].[fullhash].[ext]';
          }
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        loader: 'file-loader',
        options: {
          outputPath: '@fonts',
          name() {
            if (isDev) {
              return '[name].[ext]';
            }
            return '[name].[fullhash].[ext]';
          }
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
