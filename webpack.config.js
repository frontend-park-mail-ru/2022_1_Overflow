const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'main.[contenthash].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            css: __dirname + './src/'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require.resolve("sass"),
                        },
                    },
                ]
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: `./fonts/[name].[ext]`,
                    }
                }
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            extensions: ['ts']
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/View/Audio/',
                    to: 'Audio/'
                },
                {
                    from: 'src/sw.worker.js',
                    to: '',
                }
            ],
        }),
    ],
}