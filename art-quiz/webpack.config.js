const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const ESLintPlugin = require('eslint-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    port: 'auto',
    static: {
      directory: srcPath,
      watch: true,
    },
  },
};

const getEslintWebpackPlugin = (isDev) => isDev ? [] : [new ESLintPlugin()];

module.exports = ({ development }) => {
  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            type: "css/mini-extract",
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    mode: development ? 'development' : 'production',
    devtool: development ? 'inline-source-map' : false,
    context: srcPath,
    entry: './index.js',
    output: {
      filename: 'js/[name].[contenthash].js',
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
          use: [{loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' }}, 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [{loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' }}, 'css-loader', 'sass-loader']
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
          options: {
            // Disables attributes processing
            sources: false,
          },
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' }),
      new HtmlWebpackPlugin({ template: './index.html' }),
      new CopyPlugin({
        patterns: [
          {
            from: '**/*',
            context: srcPath,
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
      new RemoveEmptyScriptsPlugin(),
      ...getEslintWebpackPlugin(development)
    ],
    resolve: {
      extensions: ['.js'],
    },
    ...devServer(development)
  };
}
