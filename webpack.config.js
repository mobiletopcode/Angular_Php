var webpack = require('webpack');
var path = require('path');

var plugins = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    })
];

module.exports = {
    devtool: 'sourcemap',
    entry: {
        app: ["./client/app/app.js"]
    },
    output: {
        path: path.resolve(__dirname, "client", 'assets'),
        filename: 'bundle.js'
    },
    plugins: plugins,
    resolve: {
        modulesDirectories: ['node_modules', './client'],
        root: [
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['', '.js', '.jsx'],
        alias: {
            "matches-selector/matches-selector": "desandro-matches-selector",
            "eventEmitter/EventEmitter": "wolfy87-eventemitter",
            "imagesLoaded": "imagesloaded",
            "get-style-property/get-style-property": "desandro-get-style-property"
        }
    },
    module: {
        loaders: [
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            {test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf$/, loader: "file-loader"},
            {test: /\.eot$/, loader: "file-loader"},
            {test: /\.svg$/, loader: "file-loader"},
            {test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url'},
            {test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel'},
            {test: /\.html$/, loader: 'raw'},
            {test: /\.styl$/, loader: 'style!css!stylus'},
            {test: /\.css$/, loader: 'style!css'},
            {
                test: /(masonry-layout|imagesloaded|wolfy87-eventemitter)/,
                loader: 'imports?define=>false&this=>window'
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    }
};
