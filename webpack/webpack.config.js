var path = require("path");
var webpack = require('webpack');
module.exports = {
    entry: {
        app: [path.join(__dirname,"../demo/app/src/js/main.js")]
    },
    output: {
        path: path.join(__dirname, "../demo/app/dest/js"),
        publicPath: "",
        filename: "bundle.js"
    },
    plugins:[

    ]
};