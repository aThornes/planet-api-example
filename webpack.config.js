const path = require('path');

const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isProduction =
  process.env.NODE_ENV === 'PRODUCTION' || process.env.NODE_ENV === 'PROD';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/app.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  resolve: { extensions: ['.ts', '.js'], plugins: [new TsConfigPathsPlugin()] },
  optimization: {
    minimize: false,
  },
};
