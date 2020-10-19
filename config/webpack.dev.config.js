const path = require('path')
const webpack = require('webpack')
// 该插件的作用是为html文件中引入的外部资源动态添加每次compile后的hash，防止引用缓存的外部文件问题
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.config')
const config = require('./common')

module.exports = merge(baseConfig, {
    // 设置模式为 development
    mode: "development",
    // 出口配置
    output: {
        path: config.dev.assetsRoot,
        // 定义文件名，使用[name]确保每个文件名都不重复
        filename: path.posix.join(config.dev.assetsSubDirectory, 'js/[name].js'),
        publicPath: config.dev.assetsPublicPath
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 模板文件位置
            template: config.dev.index,
            // 所有静态资源注入的位置, 插入到head元素中
            inject: 'body',
            // 是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值
            hash: false,
            minify: {
                html5: true
            }
        }),
        // 模块热替换
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            name: path.posix.join(config.dev.assetsSubDirectory, 'img/[name][sha512:hash:base64:7].[ext]'),
                            publicPath:config.dev.assetsPublicPath,
                            esModule:false
                        }
                    },
                ]

            }
        ]
    },
    devServer: {
        host: config.dev.host,
        port: config.dev.port,
        // 指定服务器资源的根目录
        contentBase: path.join(__dirname, '../public'),
        // 对所有服务器资源采用gzip进行压缩
        compress: true,
        // 应对返回404页面时定向跳转到特定页面, 会跳转到index.html页面
        historyApiFallback: true,
        // 指模块替换换功能
        hot: false,
        https: false,
        noInfo: true,
        // 该属性是用来在编译出错的时候，在浏览器页面上显示错误。该属性值默认为false，需要的话，设置该参数为true。
        overlay: true,
        // 配置是否自动打开浏览器
        open: config.dev.autoOpenBrowser,
        // 跨域处理
        proxy: config.dev.proxyTable,
    }
})