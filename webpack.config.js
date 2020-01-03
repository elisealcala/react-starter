/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const webpack = require('webpack');
const envPath = require('./src/utils/path');

module.exports = {
  entry: './src/app.tsx',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            configFile: './config/babel.config.js',
          },
        },
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            ident: 'postcss',
            options: {
              config: {
                path: path.resolve(__dirname, 'config/postcss.config.js'),
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[ext]',
              // publicPath: '../../',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 3000,
    publicPath: '/',
  },
  devtool: 'source-map',
  output: {
    filename: 'static/js/[name].bundle.js',
    chunkFilename: 'static/js/[name].bundle.js',
    publicPath: './',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: `static/styles/[name].css`,
    }),
    // new webpack.DefinePlugin({
    //   ...envPath(),
    // }),
    /*
      Remove the comment to check the size of the bundle.
    */
    // new BundleAnalyzerPlugin({
    //   analyzerMode:
    //     process.env.NODE_ENV !== 'production' ? 'server' : 'disabled',
    // }),
  ],
};
