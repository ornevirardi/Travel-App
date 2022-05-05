const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//otimize-css-assets-webpack-plugin not installed, not compatible with my version of webpack.

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    devServer: {
        port: 3000,
        },
    output: {
        libraryTarget: 'var',
        library: 'Client',
        clean: true
        },
        module: {
            rules: [
                {
                    test: '/\.js$/',
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|jpg)$/,
                    loader: 'url-loader',
                    options: {
                      name: '[path][name].[ext]',
            
            
                    },
               },
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/client/views/index.html",
                filename: "./index.html",
            }),
            new MiniCssExtractPlugin({filename: "[name].css"}),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({}),
                new CssMinimizerPlugin(),
            ]
        }
    }