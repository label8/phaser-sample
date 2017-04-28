var path = require("path");
module.exports = {
    entry: {
        app: "./src/ts/app.ts"
    },
    output: {
        path: path.resolve("./dst/js/"),
        // filename: "[name].js"
        filename: "bundle.js"
    },
    resolve: {
        extensions: ["*", ".ts", ".js"]
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                exclude: /(node_modules)/
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
            },
            {
                test: /\.ts$/,
                loader: "ts-loader",
            }
        ]
    }
}

