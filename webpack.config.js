const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const postcssFlexbugs = require('postcss-flexbugs-fixes');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pathDir = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  base: path.join(__dirname, './src/base'),
  comp: path.join(__dirname, './src/components'),
  pages: path.join(__dirname, './src/pages')
};
const pagesDir = pathDir.pages;
const allPages = fs.readdirSync(pagesDir);
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

// формируем имя файла в зависимости от режима сборки
const filename = ext => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;

// лоадеры
const cssLoaders = add => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
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
            postcssFlexbugs,
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

// настройки для babel
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

// плагины
const plugins = () => {
  const base = [
    ...allPages.map(page => new HTMLWebpackPlugin({
      filename: `${page}.html`,
      template: `${pagesDir}/${page}/${page}.pug`,
      chunks: [`${page}`],
      minify: {
        collapseWhitespace: isProd
      },
      inject: 'body',
      scriptLoading: 'blocking'
    })),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, `${pathDir.base}/assets/`),
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
  } else {
    base.push(new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false
                }
              ]
            }
          ]
        ]
      }
    }));
  }
  return base;
};

// параметры оптимизации
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

// определение входных точек
const entryPoint = () => {
  const obj = {};
  allPages.forEach(page => {
    obj[`${page}`] = `./pages/${page}/${page}.js`;
  });
  return obj;
};
// определение target для фикса ошибки dev server
const getTarget = () => {
  let result;
  if (process.env.NODE_ENV === undefined || isDev === true) {
    result = 'web';
  } else {
    result = 'browserslist';
  }
  return result;
};

// модули и настройки
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: entryPoint(),
  output: {
    filename: `js/${filename('js')}`,
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.html', '.pug'],
    alias: {
      '@base': path.resolve(__dirname, 'src/base'),
      '@scss': path.resolve(__dirname, 'src/base/scss'),
      '@fonts': path.resolve(__dirname, 'src/base/fonts'),
      '@libs': path.resolve(__dirname, 'src/base/libs'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@comp': path.resolve(__dirname, 'src/components')
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    open: true
  },
  target: getTarget(),
  devtool: isDev === true ? 'source-map' : false,
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions()
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.pug$/i,
        loader: 'pug-loader',
        options: {
          pretty: isDev
        }
      },
      {
        test: /\.css$/i,
        use: cssLoaders()
      },
      {
        test: /\.(sass|scss)$/i,
        use: cssLoaders({
          loader: 'sass-loader',
          options: {
            sourceMap: true
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
        test: /\.(?:json)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'json/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        include: [
          path.resolve(__dirname, 'src/base/fonts')
        ],
        generator: {
          filename: 'fonts/[name][ext]'
        }
      }
    ]
  }
};
