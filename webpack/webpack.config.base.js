var webpack = require('webpack')
var path = path = require('path')
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
var os = require('os');
var banner = os.userInfo().username + ' modified this file at ' + new Date().toLocaleString();
module.exports = {
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.vue$/, loader: 'vue-loader' },
            /*{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },*/
            {
                test: /\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ]
            },{
                test: /\.pug$/,
                use:[{
                    loader:"pug-loader"
                }]
            },{
                test: /favicon\.ico$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                }]
            },{
                test:/\.(eot|woff|woff2|ttf|svg|png|jpg|gif)(\?.+)?$/,
                use:[{
                    loader:"url-loader?limit=10000&name=images/[name]-[hash].[ext]"
                }]
            }
        ]
    },
    resolve: {
       /* modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.js', '.json','less','scss','html','.js-lazy', '.jsx-lazy'],
        root: rootPath,*/
        alias: {
            'base': path.join(__dirname,'../scripts/core/base.js'),
            'basePC': path.join(__dirname,'../scripts/core/base-pc.js'),
            'iscroll' : path.join(__dirname,'../scripts/widget/iscroll'),
            'swiper' : path.join(__dirname,'../scripts/widget/swiper'),
            'lazyload' : path.join(__dirname,'../scripts/widget/lazyload'),
            'serialize' : path.join(__dirname,'../scripts/widget/serialize-lazy'),
            'validatePC' : path.join(__dirname,'../scripts/widget/validate-pc-lazy'),
            'serialize1' : path.join(__dirname,'../scripts/widget/serialize'),
            'validatePC1' : path.join(__dirname,'../scripts/widget/validate-pc'),
            'Picker':path.join(__dirname,'../scripts/widget/picker.min.js'),
            'Time':path.join(__dirname,'../scripts/widget/Time.js'),
            'jqueryForm' : path.join(__dirname,'../scripts/widget/jquery-form'),
            'sliderPc' : path.join(__dirname,'../scripts/widget/slider-pc'),
            'datePicker' : path.join(__dirname,'../scripts/widget/datepicker/datepicker'),
            'pagerControlPC' : path.join(__dirname,'../scripts/widget/pagerControl'),
            'util' : path.join(__dirname,'../scripts/utils/util'),
            'utility_app' : path.join(__dirname,'../scripts/utils/utility_app'),
            'cookieUtils' : path.join(__dirname,'../scripts/utils/cookie'),
            'fetch': path.join(__dirname,'../scripts/utils/util.fetch'),
            'queryString' : path.join(__dirname,'../scripts/utils/util.querystring'),
            'validate':path.join(__dirname,'../scripts/utils/util.validate'),
            'storage':path.join(__dirname,'../scripts/utils/storage'),
            'storage11':path.join(__dirname,'../scripts/utils/util.storage.1.1'),
            'reactUI':path.join(__dirname,'../scripts/widget/react-ui/'),
            'IScroll':path.join(__dirname,'../scripts/widget/react-ui/'),
            'reactCalendar': path.join(__dirname,'../scripts/widget/react-ui/calendar/calendar'),
            'reactStepper': path.join(__dirname,'../scripts/widget/react-ui/stepper/stepper'),
            'es5' : path.join(__dirname,'../scripts/core/es5'),
            'layui' : path.join(__dirname,'../scripts/core/layui'),
            'BaseFetch':path.join(__dirname,'../scripts/core/base-fetch'),
            'datepickerJs' : path.join(__dirname,'../scripts/widget/jquery-ui/datepicker/jquery-ui.js'),
            'datepickerCss' : path.join(__dirname,'../scripts/widget/jquery-ui/datepicker/jquery-ui.css'),
            'vueModal': path.join(__dirname,'../scripts/widget/vue-ui/modal'),
            'vue': path.join(__dirname,'../scripts/core/vue.min.js'),
        }
    },
    externals: {
        //'react': 'window.React',
        //'react-dom': 'window.ReactDOM',
        /*'jQuery':'window.jQuery',
        'jquery':'window.jQuery',*/
        'Zepto':'window.Zepto',
        'VueRouter':'window.VueRouter'
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: banner
        }),

        /* new webpack.optimize.CommonsChunkPlugin({
             name: 'common',
             filename: './js/common.js'
         }),
         new ExtractTextPlugin({
             filename: './css/[name].css',
             allChunks:true
         }),*/
        //new webpack.HotModuleReplacementPlugin()
    ]
}