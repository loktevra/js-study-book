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
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'css-loader', 
          'less-loader'
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "index.html"
    })
  ]
}

const prodConfig = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
        ],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}

const devConfig = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [ 
          'style-loader',
        ]
      }
    ]
  }
}

const smartMerge = merge.smartStrategy({ 'module.rules.use': 'prepend'})

module.exports = (env, { mode }) => {
  if (mode == 'production') {
    return smartMerge(baseConfig, prodConfig)
  }

  return smartMerge(baseConfig, devConfig)
};
