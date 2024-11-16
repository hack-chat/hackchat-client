/**
 * Exports common base options common to both dev and prod webpack configs
 */

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const path = require('path');
const webpack = require('webpack');

module.exports = options => {
  return {
    mode: options.mode,
    entry: options.entry,
    output: Object.assign(
      {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
      },
      options.output,
    ),
    optimization: options.optimization,
    module: {
      rules: [
        {
          type: 'javascript/auto',
          test: /config\.json$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './'
          }
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: options.babelQuery,
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          use: 'file-loader',
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          type: "asset",
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: ImageMinimizerPlugin.loader,
          enforce: "pre",
          options: {
            minimizer: {
              implementation: ImageMinimizerPlugin.imageminMinify,
              options: {
                plugins: [
                  "imagemin-gifsicle",
                  "imagemin-mozjpeg",
                  "imagemin-pngquant",
                  "imagemin-svgo",
                ],
              },
            },
          },
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.(mp4|webm)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        },
      ],
    },
    plugins: options.plugins.concat([
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
      }),
    ]),
    resolve: {
      modules: ['node_modules', 'app'],
      extensions: ['.mjs', '.js', '.jsx', '.react.js'],
      mainFields: ['browser', 'jsnext:main', 'main'],
    },
    devtool: options.devtool,
    target: 'web',
    performance: options.performance || {},
  };
};
