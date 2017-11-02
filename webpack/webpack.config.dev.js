var baseConfig = require('./webpack.config.base');
//var webpack = require('webpack')
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
var devConfig = Object.create(baseConfig);
/*devConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
        test:/\.vue$/,
        options: {
            vue: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        fallback:'vue-style-loader',
                        use:'css-loader',
                    }),
                }
            }
        }
    })
)*/
devConfig.watch = true
devConfig.devtool = 'source-map'
module.exports = devConfig
