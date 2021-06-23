/**
 * Exports common base options common to both dev and prod webpack configs
 */

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
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10 * 1024,
                noquotes: true,
              },
            },
          ],
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10 * 1024,
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  enabled: false,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
              },
            },
          ],
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
