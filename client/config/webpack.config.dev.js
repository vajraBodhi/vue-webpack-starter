'use strict';

const helpers = require('./helpers');
// 合并config文件
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

// 验证config文件是否正确
const validate = require('webpack-validator');
// 在编译期定义一些直接访问的常量，用以区分开发跟最终构建时做不同行为
const DefinePlugin = require('webpack/lib/DefinePlugin');
// const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
// // 自动打开浏览器
// const OpenBrowserPlugin = require('open-browser-plugin');
// // 压缩通过你屏幕scripts中是否开启optimize minimize来设置
// const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
// 提取css文件，两种模式
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 常量
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '3000';
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig.metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: HMR
});

module.exports = validate(webpackMerge(commonConfig, {
    metadata: METADATA,

    debug: true,
    devtool: 'cheap-module-source-map',

    output: {
        path: helpers.root('dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        sourceMapFilename: '[name].map',

        library: 'chess_[name]',
        libraryTarget: 'var'
    },

    plugins: [
    // 此插件定义的全局变量在代码中可以使用，编译后会自动替换
    new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
            'ENV': JSON.stringify(METADATA.ENV),
            'NODE_ENV': JSON.stringify(METADATA.ENV),
            'HMR': METADATA.HMR,
            'CONFIG': JSON.stringify(METADATA.CONFIG)
        }
    }),
    new ExtractTextPlugin("css/[name.css]"/*, {allChunks: true}*/)
    ],

    devServer: {
        host: METADATA.host,
        port: METADATA.port,
        historyApiFallback: true,
        open: true,
        inline: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
}));