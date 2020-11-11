const path = require('path')

module.exports = {
    dev: {
        index: path.resolve(__dirname, '../public/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        host: '0.0.0.0',
        port: 5050,
        autoOpenBrowser: true,
        proxyTable: {}
    },
    build: {
        index: path.resolve(__dirname, '../public/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
    }
}