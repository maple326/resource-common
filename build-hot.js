var HtmlWebpackPlugin = require('./webpack/node_modules/html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');
var [p1, p2, taskName, ...fileNames] = process.argv;
var moduleName = taskName.split(':')[0];
var mode = taskName.split(':')[1];
fileNames = fileNames || 'index';
if (!moduleName) {
    throw new Error('expect a moduleName of modules.js file')
}
if (!mode) {
    throw new Error('expect a mode, it must be one of ["dev", "prod"]')
}
var webpack = require('./webpack/node_modules/webpack/lib/webpack')
var modules = require('./webpack/modules')
var configMode = mode === 'prod' ? 'prod' : 'dev';
var webpackConfig = require('./webpack/webpack.config.' + configMode);
// 是否生产模式
var isProduction = mode === 'prod';
runWebpack(webpackConfig, isProduction);
function runWebpack(baseConfig, isProduction) {
    var config = Object.create(baseConfig)
    var basePath = path.join.call(path, moduleName)
    var {moduleConfig, buildFiles} = modules(basePath, fileNames, isProduction);
    var outputType = typeof moduleConfig.output
    Object.assign(config, moduleConfig)
    config.entry = {}
    config.entry = moduleConfig.entry;
    // handle output
    if (outputType === 'string') {
        config.output = {}
        config.output.path = moduleConfig.output
    } else if (outputType === 'object') {
        config.output = Object.assign({}, config.output, moduleConfig.output)
    }
    if (isProduction) {
        config.plugins.push(new CleanWebpackPlugin([`${moduleName}/dist`], {
            root: __dirname,
            verbose: true,
            dry: false,
        }));
        config.plugins.push(
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                filename: 'js/common.js'
            }),
        );
        for (var i in buildFiles) {
            var fName = buildFiles[i].split('.js')[0];
            config.plugins.push(
                new HtmlWebpackPlugin({
                    filename: '../' + fName + '.html',
                    chunks: [fName, 'common'],
                    title: 'test',
                    cache: false,
                    hash: true,
                    template: path.join(__dirname, '/', moduleName, '/layout.html')
                })
            )
        }
    } else {
        config.entry = {
            app: [path.join(__dirname, `/${moduleName}/src/js/${fileNames}.js`)]
        }
        config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
        config.output = {
            path: path.join(__dirname, `/${moduleName}/dist/`),
            filename: "bundle.js",
            publicPath: '/'
        };
        config.module.rules.push({
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader",
                "less-loader",
            ]
        });
        /*  config.devServer = {
         historyApiFallback: true,
         inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
         },*/
        config.plugins.push(
            new HtmlWebpackPlugin({
                filename: './index.html',
                chunks: ['bundle'],
                title: '高顿前端－开发模式',
                cache: false,
                hash: true,
                template: path.join(__dirname, '/template.html')
            })
        );
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    if (isProduction) {
        return new Promise(function (resolve, reject) {
            var count = 0
            let compiler = webpack(config, function (err, stats) {
                if (err) {
                    reject(err)
                }
                if (!stats) {
                    return
                }
                var info = stats.toString({
                    colors: true,
                    chunks: false,
                    cached: true
                })
                console.log(info)
                if (count === 0) {
                    resolve(info)
                } else {
                    console.log('change times: ' + count)
                }
                count += 1
            })
        })
    } else {
        let compiler = webpack(config);
        var server = new WebpackDevServer(compiler, {
            contentBase: path.join(__dirname, `/${moduleName}/dist`),
            stats: {colors: true},
            hot: true,
            inline: true,
            noInfo: false,
            progress: true,
            compress: true,
            historyApiFallback: true,
            publicPath: config.output.publicPath,
            host:'http://192.168.35.239',
            disableHostCheck: true,
        });
        server.listen(8080);
    }
}
