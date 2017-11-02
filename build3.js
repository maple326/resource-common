var config = require("./webpack/webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var path =require('path');
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin())
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname,"/demo/app/dest"),
    compress: true,
    hot: true,
    stats: { colors: true },
    publicPath: '/',
    progress: true,
});
server.listen(8080);