const webpack = require('webpack'),
    {merge} = require('webpack-merge'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),

    baseWebpackConfig = require('../webpack.config.base.js'),

    env = process.env.NODE_ENV;

Object.keys(baseWebpackConfig.entry).forEach(name => {
    baseWebpackConfig.entry[name] = ['./build/dev/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {

    mode: 'development',

    devtool: '#cheap-module-eval-source-map',

    watchOptions: {
        ignored: ['node_modules'],
        aggregateTimeout: 300,
        poll: 1500
    },

    plugins: [

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `'${env}'`
            }
        }),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoEmitOnErrorsPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true
        }),

        new FriendlyErrorsPlugin()

    ]

});
