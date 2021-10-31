const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'production',
    entry: {
        main: './src/assets/js/main.js',
        login: './src/assets/js/login.js',
        register: './src/assets/js/signup.js',
        photoAdd: './src/assets/js/photoAdd.js',
        photoDetail: './src/assets/js/photoDetail.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle_[chunkhash].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
            },
        ],
    },
    plugins: [
        new new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'photo-add.html',
            template: 'src/photo-add.html',
            chunks: ['photoAdd']
        }),
        new HtmlWebpackPlugin({
            filename: 'photo-detail.html',
            template: 'src/photo-detail.html',
            chunks: ['photoDetail']
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: 'src/login.html',
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({
            filename: 'signup.html',
            template: 'src/signup.html',
            chunks: ['signup']
        }),
    ],
}