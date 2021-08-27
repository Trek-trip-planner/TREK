const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  let envKeys = {};
  if (process.env.NODE_ENV === 'production') {
    process.env.MB_PUBKEY;
  } else {
    const env = dotenv.config().parsed;
    envKeys = Object.keys(env).reduce((prev, next) => {
      prev[next] = JSON.stringify(env[next]);
      return prev;
    }, {});
  }

  return {
    entry: ['./client/index.js'],
    output: {
      path: __dirname,
      filename: './public/bundle.js',
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
        {
          test: /\.css?$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [new webpack.DefinePlugin(envKeys)],
  };
};
