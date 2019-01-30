const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/scripts/index.js"
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./dev"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dev")
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
