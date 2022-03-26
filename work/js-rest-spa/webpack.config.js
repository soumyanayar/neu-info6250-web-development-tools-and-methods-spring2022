const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/inventory.js",
  devtool: "source-map",
  output: {
    filename: "inventory.js",
    path: path.resolve(__dirname, "public", "js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
    ],
  },
};
