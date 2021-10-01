const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    port: 'auto',
    static: {
      directory: path.resolve(__dirname, 'src'),
      watch: true,
    },
  },
};

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  entry: './index.js',
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[file]',
  },
  target: ['web', 'es6'],
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:mp3|wav|ogg|mp4)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[contenthash].css' }),
    new HtmlWebpackPlugin({ template: './index.html' }),
    new HtmlWebpackPlugin({
      filename: 'tour1.html',
      template: './tour1.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'tour2.html',
      template: './tour2.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'tour3.html',
      template: './tour3.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'tour4.html',
      template: './tour4.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'tour5.html',
      template: './tour5.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'tour6.html',
      template: './tour6.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'welcome-tour.html',
      template: './welcome-tour.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, './src'),
          globOptions: {
            ignore: [
              '**/*.js',
              '**/*.ts',
              '**/*.scss',
              '**/*.sass',
              '**/*.html',
            ],
          },
          noErrorOnMissing: true,
          force: true,
        }
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.js'],
  },
  ...devServer(development)
});
