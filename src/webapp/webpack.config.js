var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./react/index.js",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: ['node_modules/'],
                loader: 'babel-loader',
                query: {
                    presets: [
                        'react',
                        'es2016'
                    ],
                    plugins: [
                        'react-html-attrs',
                        'transform-class-properties',
                        'transform-object-rest-spread'
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