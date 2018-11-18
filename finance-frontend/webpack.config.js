const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const baseConfig = {
  entry: './src/index.js',
  output: {
    filename: '[name]-[hash:5].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader', 
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: "index.html"
    })
  ]
}

const prodConfig = {
  plugins: [
    new MiniCssExtractPlugin(),
  ],
}

module.exports = (env, { mode }) => {
  if (mode == 'production') {
    return merge(baseConfig, prodConfig)
  }

  return baseConfig
};
