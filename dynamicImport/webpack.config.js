const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name]-[hash:6].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: "index.html",
      title: 'dyn import',
      meta: {
        viewport: 'width=device-width, initial-scale=1',
      },
    }),
  ],
}