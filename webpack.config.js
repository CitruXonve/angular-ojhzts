const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { AngularWebpackPlugin } = require("@ngtools/webpack");

module.exports = async (env, argv) => {
    const linkerPlugin = (await import("@angular/compiler-cli/linker/babel")).default;

    return {
        entry: {
            app: "./src/main.ts", // bundle's entry point
            polyfills: path.resolve(__dirname, 'src/polyfills.ts'),
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
                    test: /(\.component)?\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /(\.component)?\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.[jt]sx?$/,
                    loader: "@ngtools/webpack",
                },
                {
                    test: /\.[cm]?js$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                        cacheDirectory: true,
                        compact: false,
                        plugins: [linkerPlugin],
                        },
                    },
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: ['@ngtools/webpack']
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                headHtmlSnippet: '<base href="/" />',
                bodyHtmlSnippet: '<app-root></app-root>'
            }),
            new MiniCssExtractPlugin(),
            new AngularWebpackPlugin({
                tsconfig: "./tsconfig.json",
            }),
        ],
        mode: 'development',
    }
};