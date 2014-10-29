module.exports = {
    entry: "./app/scripts/main.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
//    module: {
//        loaders: [
//            { test: /\.css$/, loader: "style!css" }
//        ]
//    }
};
