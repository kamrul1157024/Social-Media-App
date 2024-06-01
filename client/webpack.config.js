const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return {
        mode,
        entry: "./src/index.js",
        output: {
            publicPath: "/",
            path: path.resolve(__dirname, "build"),
            filename: "bundle.js"
        },
        devServer: {
            open: true,
            port: 3081,
            historyApiFallback: true,
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.jpe?g|png|svg|gif|ico$/,
                    exclude: /node_modules/,
                    use: ["url-loader", "file-loader"]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                filename: './index.html',
                favicon: './public/favicon.ico'
            }),
            new webpack.HotModuleReplacementPlugin(),
        ]
    }
};