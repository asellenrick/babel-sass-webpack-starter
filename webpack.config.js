const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";
  const doNotCopy = [ 'scripts/*.js','**/*.ejs','styles/**/*.scss'];
  if (!devMode)
    doNotCopy.push('_data/**/*');
  return {
    entry: {
      app: ["babel-polyfill", "./src/scripts/app.js", "./src/styles/main.scss"]
    },
    output: {
      path: path.resolve(__dirname, "build/"),
      filename: "scripts/app.bundle.js",
      publicPath: "./"
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ["env", "stage-0"]
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader:"css-loader",
              options: { url: false }
            },
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
          devMode:devMode,
          template: './src/index.ejs',
          filename: 'index.html'  
      }),
      new CopyWebpackPlugin([
        {
          from: '**/*',
          to: './',
          context:'src',
          ignore: doNotCopy
        }
      ]),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].css',
      }),
      new CleanWebpackPlugin(['build'])
    ]
  };
};