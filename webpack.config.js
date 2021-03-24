const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
// const globImporter = require('node-sass-glob-importer');



module.exports = {
  mode: 'development',
  entry: './src/page.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/page.js'
  },

  devServer: {
    host: 'localhost',
    port: 3000,
    stats: 'errors-only',
    open: true
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "pug-html-loader",
            options: {
              "pretty": true
            }
          }
        ]
      },
      {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader?url=false",
          // "style-loader",
          // "css-loader",
          {
            loader: "sass-loader",
          }
        ],
      },

      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //         loader: 'babel-loader',
      //         options: {
      //           presets: ['@babel/preset-env'],
      //           plugins: ['@babel/plugin-proposal-class-properties']
      //         }
      //       }
      // },


      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name(file) {
      //           if (process.env.NODE_ENV === 'development') {
      //             return 'assets/images/[hash].[ext]';
      //           }
      //
      //           return 'assets/images/[name].[ext]';
      //         },
      //       }
      //     }
      //   ]
      // },
    ]
  },

  plugins: [
    //очистка папки dist сборкой
    new CleanWebpackPlugin(),

    //pug файлы генерируемые в html
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: './src/pug/index.pug',
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      filename: "services.html",
      template: './src/pug/services.pug',
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      filename: "blog.html",
      template: './src/pug/blog.pug',
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      filename: "news.html",
      template: './src/pug/news.pug',
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      filename: "single-service.html",
      template: './src/pug/single-service.pug',
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      filename: "single-blog.html",
      template: './src/pug/single-blog.pug',
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      filename: "single-news.html",
      template: './src/pug/single-news.pug',
      inject: 'body'
    }),

    //отвечает за css
    new MiniCssExtractPlugin({
      filename: "css/main.css"
    }),

    //отвечает за копирование не компилируемых файлов в продакшен
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/public',
          to: './'
        }
      ]
    }),

    //подключение jquery в проект
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      // 'window.$': 'jquery',
      // stellar: ['src/js/jquery.stellar.min.js', 'default'],
      // jquery: "./src/js/jquery.min.js",
      // jQuery: "./src/js/jquery.min.js",
      // "window.jQuery": "./src/js/jquery.min.js"
    })

  ]
}