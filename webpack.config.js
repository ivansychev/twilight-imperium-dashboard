const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

// TODO: add source map to dev
// TODO: add husky hooks
// TODO: remove comments in config as soon as wiki for ui appears

//TODO: review MiniCssExtractPlugin and implement minification

module.exports = {
    mode : devMode ? 'development' : 'production',
    entry: "./src/index.jsx",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: "pre",
                loader: "eslint-loader", //to lint our code and catch warns and errors before babel transpilation
                exclude: /node_modules/,
                options: {
                    emitWarning: true,
                    configFile: "./.eslintrc.json"
                }
            },
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader", //to transpile our modern JS to old JS
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    (devMode
                        ? 'style-loader' // to link and incorporate our style-in-JS in code
                        : MiniCssExtractPlugin.loader
                    ),
                    {
                        loader: "css-loader", // CSS --> style-in-JS
                        options: {
                            modules: true,
                            localsConvention: 'camelCase'
                        },

                    },
                    {
                        loader: "postcss-loader" // CSS --> to better crossplatform CSS
                    },
                    {
                        loader: "sass-loader" // SCSS --> CSS
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        })
    ]
};