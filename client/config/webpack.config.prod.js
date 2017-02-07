'use strict'

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

// const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
// Loader选项配置相关插件
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
// 提取css文件，两种模式
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// // 忽略对某些文件的编译
// const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');

/*
  webpack 相关常量
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8000;
const METADATA = webpackMerge(commonConfig.metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: false
});

module.exports = webpackMerge(commonConfig, {
    // metadata: METADATA,

    debug: false,

    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        filename: "[name].[chunkhash].bundle.js",
        sourceMapFilename: '[name].[chunkhash].bundle.map',
        chunkFilename: '[id].[chunkhash].chunk.js'//,
        // publicPath: METADATA.CDN
    },

    plugins: [
        new WebpackMd5Hash(),
        new LoaderOptionsPlugin({
            debug: true
        }),
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

        new UglifyJsPlugin({
            sourceMap: true,
            beautify: false,
            output: {
                comments: false
            },
            mangle: {
                screw_ie8: true
            },
            compress: {
                screw_ie8: true,
                warnings: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true//,
                // negate_life: false
            }
        })
    ],

    // htmlLoader: {
    //     minimize: true,
    //     removeAttributeQuotes: false,
    //     caseSensitive: true
    // },

    node: {
        global: 'window',
        crypto: 'empty',
        process: false,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
});
