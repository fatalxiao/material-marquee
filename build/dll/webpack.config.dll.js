const webpack = require('webpack'),
    AssetsPlugin = require('assets-webpack-plugin'),
    // CompressionPlugin = require('compression-webpack-plugin'),

    config = require('../config.js'),
    utils = require('../utils.js'),

    library = '[name]_lib';

module.exports = {

    mode: 'production',

    entry: {
        'polyfill': ['@babel/polyfill'],
        'react': ['react', 'react-dom'],
        'xlsx': ['xlsx'],
        'tools': ['classnames']
    },

    output: {
        publicPath: './',
        path: config.build.assetsRoot,
        filename: utils.assetsSubPath('vendors/[name].[chunkhash].js'),
        library
    },

    plugins: [

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new webpack.DllPlugin({
            context: __dirname,
            path: utils.assetsVendorsAbsolutePath('[name]-manifest.json'),
            name: library
        }),

        new AssetsPlugin({
            path: config.build.assetsRoot,
            filename: utils.assetsSubPath('vendors/vendors-assets.json')
        })

        // new CompressionPlugin({
        //     test: new RegExp('\\.(' + config.productionGzipExtensions.join('|') + ')$'),
        //     cache: true,
        //     filename: '[path].gz[query]',
        //     algorithm: 'gzip',
        //     threshold: 1,
        //     minRatio: 0.8
        // })

    ]

};
