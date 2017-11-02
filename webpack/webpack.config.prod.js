var webpack = require('webpack')
var baseConfig = require('./webpack.config.base')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var prodConfig = Object.create(baseConfig);
prodConfig.devtool = 'source-map';
prodConfig.module.rules.push({
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
    })
});
prodConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
		  warnings: false,
		  drop_console: false,
		}
    }),
    new ExtractTextPlugin({
        filename: 'css/[name].css',
        allChunks:true
    }),
    new webpack.LoaderOptionsPlugin({
        test:/\.vue$/,
        options: {
            vue: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        fallback:'vue-style-loader',
                        use:'css-loader',
                    }),
                    less: ExtractTextPlugin.extract({
                        fallback:'vue-style-loader',
                        use:'less-loader',
                    }),
                }
            }
        }
    })
)
module.exports = prodConfig
