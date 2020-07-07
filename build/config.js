const path = require('path');

module.exports = {

    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    productionGzipExtensions: ['js', 'css'],

    'development': {
        port: 4010,
        srcRoot: path.resolve(__dirname, '../src'),
        index: path.resolve(__dirname, '../src/index.html'),
        assetsVirtualRoot: path.posix && path.posix.join('/', 'static'),
        rootDirectory: 'dist/dist-dev',
        assetsDirectory: 'dist/dist-dev/dist',
        assetsRoot: path.resolve(__dirname, '../dist/dist-dev/dist'),
        isHotReload: true
    }

};
