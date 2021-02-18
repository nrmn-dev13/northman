const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../src/script.js'),
  output:
  {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'source-map',
  plugins:
    [
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, '../static') }
        ]
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.html'),
        minify: true
      }),
      new MiniCSSExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "style.css",
        chunkFilename: "[id].css",
      })
    ],
  module:
  {
    rules:
      [
        // HTML
        {
          test: /\.(html)$/,
          use: ['html-loader']
        },

        // JS
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use:
            [
              'babel-loader'
            ]
        },

        // CSS
        {
          test: /\.s[ac]ss$/i,
          use: [{
              loader: MiniCSSExtractPlugin.loader
            },
            "css-loader",
            "sass-loader",
          ]
        },

        // Images
        {
          test: /\.(jpg|png|gif|svg)$/,
          use:
            [
              {
                loader: 'file-loader',
                options:
                {
                  outputPath: 'assets/images/'
                }
              }
            ]
        },

        // Fonts
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use:
            [
              {
                loader: 'file-loader',
                options:
                {
                  outputPath: 'assets/fonts/'
                }
              }
            ]
        },

        // Shaders
        {
          test: /\.(glsl|vs|fs|vert|frag)$/,
          exclude: /node_modules/,
          use: [
            'raw-loader'
          ]
        }
      ]
  }
}
