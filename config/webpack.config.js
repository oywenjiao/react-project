const path = require('path')
const APP_PATH = path.resolve(__dirname, '../src')

module.exports = {
    entry: {
        // 定义入口
        app: './src/index.js'
    },
    performance: {
        // 性能优化，不展示警告或错误提示
        hints: false
    },
    module: {
        rules: [
            {
                // 预处理js、jsx后缀的文件
                test: /\.jsx?$/,
                // 扫描区间
                include: APP_PATH,
                // 排除下列目录
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            // "@babel/preset-env"这个东西是babel提供给自己用的插件
                            presets: ["@babel/preset-env", "@babel/preset-react"]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        // 别名配置
        alias: {
            '@': APP_PATH
        }
    }
}