const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html"
});
module.exports = {
    mode: "development",
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
                test: /\.scss$/,
                use: [
                    "style-loader", // Inject styles from JS to DOM
                    "css-loader",   // Compile CSS to JS
                    "sass-loader"   // Compile SCSS to CSS
                ]
            }
        ]
    },
    plugins: [htmlPlugin]
};
