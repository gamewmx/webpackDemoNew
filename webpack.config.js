const path = require("path");
const HtmlWebpackPlugin  = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
function resolve(dir) {
    return path.resolve(__dirname, dir)
}

module.exports = {
    // 指定构建环境
    mode:"development",
    // 入口
    entry: {
        app: "./src/index"
    },
    // 出口
    output: {
        path : resolve("../dist"),
        filename: "js/[name].[hash].js",
        publicPath: "/" // 打包后的资源的访问路径前缀
    },
    // // 出口
    // output: {
    //     path : path.join(__dirname,'dist'),
    //     filename: "[name].[hash].js",
    //     // publicPath: "/" // 打包后的资源的访问路径前缀
    // },
    // 模块
    module:{
        rules: [
            {
                test:/\.(js|jsx)$/,
                loader:'babel-loader',
                exclude:/node_modules/,
                options: {
                    cacheDirectory: true, // 启用缓存机制以防止在重新打包未更改的模块时进行二次编译
                    // presets: [[
                    //     'env', {
                    //         modules: false, // 将ES6 Module的语法交给Webpack本身处理
                    //     }
                    // ]],
                },
            }, {
                test: /\.js|tsx$/,
                use: [
                    {
                        loader: 'my-loader',
                        options: {
                            flag: true,
                        },
                    },
                ],
            },{
                test:/\.(ts|tsx)$/,
                loader:'ts-loader',
                exclude:/node_modules/,
            },
            {
                test:/\.(css|less)$/,
                use:[
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "less-loader",
                    }
                ]
            }, {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader'
            }

        ]
    },
    resolveLoader: {
        modules: ['node_modules', './src/MyLoader'],
    },
    // 插件
    plugins:[
        new HtmlWebpackPlugin({
            filename: resolve('./../dist/index.html'), // html模板的生成路径
            template: 'index.html',//html模板
            inject: true, // true：默认值，script标签位于html文件的 body 底部
            hash: true, // 在打包的资源插入html会加上hash
            //  html 文件进行压缩
            minify: {
                removeComments: true,               //去注释
                collapseWhitespace: true,           //压缩空格
                removeAttributeQuotes: true         //去除属性 标签的 引号  例如 <p id="test" /> 输出 <p id=test/>
            }
        }),
        new CleanWebpackPlugin()

    ],
    // 开发环境本地启动的服务配置
    devServer: {
        historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
        hot: true,
        contentBase: false, // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
        compress: true, // 一切服务都启用gzip 压缩：
        port: "8080", // 指定段靠谱
        publicPath: "/", // 访问资源加前缀
        proxy: {
            // 接口请求代理
        },
        open:true
    },
    resolve: {
        extensions: [
            '.ts',
            '.js',
            '.json',
            '.tsx'
        ]
    }
}