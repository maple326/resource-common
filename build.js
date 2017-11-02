var HtmlWebpackPlugin = require('./webpack/node_modules/html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path=require('path');
require('./start');
var [p1,p2,taskName,...fileNames] = process.argv;
var moduleName = taskName.split(':')[0];
var mode = taskName.split(':')[1]
if (!moduleName) {
    throw new Error('expect a moduleName of modules.js file')
}
if (!mode) {
    throw new Error('expect a mode, it must be one of ["dev", "prod"]')
}
var webpack = require('./webpack/node_modules/webpack/lib/webpack')
var modules = require('./webpack/modules')
var configMode=mode==='prod'?'prod':'dev';
var webpackConfig = require('./webpack/webpack.config.'+ configMode);
// 是否生产模式
var isProduction = mode === 'prod';
runWebpack(webpackConfig,isProduction);
function runWebpack(baseConfig, isProduction) {
    var config = Object.create(baseConfig)
    var basePath=path.join.apply(path,moduleName.split('-'))
    var {moduleConfig,buildFiles} = modules(basePath,fileNames,isProduction);
    var outputType = typeof moduleConfig.output
    Object.assign(config, moduleConfig)
    config.entry = {}
    config.entry = moduleConfig.entry
    // handle output
    if (outputType === 'string') {
        config.output = {}
        config.output.path = moduleConfig.output
    } else if (outputType === 'object') {
        config.output = Object.assign({}, config.output, moduleConfig.output)
    }

    // handle productionConfig mock.gaodun.com/acca_dev
    if (isProduction) {
        if(moduleName.split('-')[0].indexOf('acca') > -1){
            let publishFile = moduleName.split('-')[0].split('/')[1].split('_')[0]; // acca
            config.plugins.push(
                new CopyWebpackPlugin([{
                    from: path.join(__dirname,'/',moduleName.split('-')[0],'/',moduleName.split('-')[1],'/dist'),
                    to: path.join(__dirname,'/',moduleName.split('-')[0].split('/')[0],'/',publishFile),
                }])
            )
        }

        basePath = basePath.replace(/\\/,'/');
        //config.output.publicPath = `https://ceair-resource.oss-cn-shanghai.aliyuncs.com/${basePath}/js/`;
    }
    for(var i in buildFiles){
        var fName = buildFiles[i].split('.js')[0];
        config.plugins.push(
            new HtmlWebpackPlugin({
                filename:'./'+fName+'.html',
                chunks:[fName,'common'],
                title:'test',
                hash:true,
                template:path.join(__dirname,'/',moduleName.split('-')[0],'/',moduleName.split('-')[1],'/layout.html')
            })
        )
    }

    return new Promise(function(resolve, reject) {
        var count = 0
        var compiler=webpack(config, function(err, stats) {
            if (err) {
                reject(err)
            }
            if (!stats) {
                return
            }
            var info = stats.toString({
                // output options
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
}
