const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/main.ts", // bundle's entry point
        // polyfill: path.resolve(__dirname, 'src/polyfill.ts'),
    },
    devtool: "source-map",
    devServer: {
      historyApiFallback: true
    },
    resolve: {
        extensions: [
            '.js', 
            '.ts', 
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // output directory
        filename: "[name].bundle.js", // name of the generated bundle
        publicPath: '/',
    },
    module: {
        rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['raw-loader', 'babel-loader']
            },
            {
                test: /\.component\.(html|css)/,
                use: [
                    {
                        loader: 'raw-loader'
                    }
                ]
            },
            // Angular component styles
            { 
                test: /\.(scss|css)$/,
                include: [
                    path.join(__dirname, 'src/app'),
                ],
                use: [
                    "style-loader",
                    "@teamsupercell/typings-for-css-modules-loader",
                    "css-loader",
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: false,
            headHtmlSnippet: '<base href="/" />',
            bodyHtmlSnippet: '<app-root></app-root>'
        }),
        new HtmlWebpackPlugin({
            template: "./src/app/app.component.html",
            filename: "app.component.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/app/product-list/product-list.component.html",
            filename: "product-list.component.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/app/top-bar/top-bar.component.html",
            filename: "top-bar.component.html",
        }),
    ],
    mode: 'development',
};