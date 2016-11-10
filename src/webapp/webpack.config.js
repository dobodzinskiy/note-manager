var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./react/index.js",
    module: {
        loaders: [
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'react',
                        'es2016'
                    ],
                    plugins: [
                        'react-html-attrs',
                        'transform-class-properties',
                        'transform-object-rest-spread',
                        'transform-decorators-legacy'
                    ]
                }
            }
        ]
    },
    output: {
        path: "../server/public",
        filename: "bundle.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
    ]
};