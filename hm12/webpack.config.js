module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            'handlebars': 'handlebars/dist/handlebars.min.js',
            'vk': './vendor/openapi.js'
        }
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"]
        }, {
            test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file?name=fonts/[name].[ext]"
        }]
    }
};
