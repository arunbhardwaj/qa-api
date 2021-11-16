path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: __dirname + '/client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/client/dist'
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: [/\.(png|jpe?g|gif)$/i],
        use: {
            loader: 'file-loader',
          }
      },
      {
        test: [/\.svg$/],
        use: {
          loader: 'url-loader',
        },
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
};