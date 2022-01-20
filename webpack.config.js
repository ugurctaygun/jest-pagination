const path = require("path");
const HTMLplugin = require("html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundled.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  watch: true,
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
};
