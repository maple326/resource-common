/**
    该文件将 webpack.config.js 里的 entry/output 配置抽离
*/
fs=require('fs');
var path = require('path')
module.exports=getConfigs;
function getConfigs(pathBase,filters,isProduction){
    var filenames=fs.readdirSync(path.join(__dirname,'../',pathBase,'src/js/')).filter(function(dirname){
            return /\.js[x]?$/.test(dirname)&& (!filters||filters.length==0||filters.indexOf(dirname.split('.')[0])>-1);
        })
   /* let output = {
        path:path.join(path.join(__dirname,'../',pathBase,'dist/')),
        filename: './js/[name].js',
        chunkFilename: './js/[name].min.js',
        publicPath : ""
    }*/
    let output = {
        path:path.join(path.join(__dirname,'../',pathBase,'/dist/')),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].[hash].min.js',
        publicPath : "/dist/"
    }
    var configs={
        entry:{},
        output
    };
    var buildFiles = [];
    filenames.forEach(function(filename){
        configs.entry[filename.split('.')[0]]= path.join(__dirname,'../',pathBase,'src/js/',filename);
        buildFiles.push(filename);
    });
    configs.entry.common = path.join(__dirname,'../',pathBase,'src/js/common/common.js');
    /*fs.exists(path.join(__dirname,'../',pathBase,'src/js/common/common.js'), function(exists) {
        if(exists){
            configs.entry.common = path.join(__dirname,'../',pathBase,'src/js/common/common.js');
        }
    });*/
    return {
        moduleConfig: configs,
        buildFiles: buildFiles
    };
}