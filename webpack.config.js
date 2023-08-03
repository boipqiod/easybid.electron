const path = require('path');

module.exports = {
    mode: 'development',
    target: 'node', // important in order not to bundle built-in modules like path, fs, etc.
    entry: './app.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            "fs": false,
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "url": require.resolve("url/"),
            "zlib": require.resolve("browserify-zlib"),
            "querystring": require.resolve("querystring-es3"),
            "assert": require.resolve("assert/"),
            "buffer": require.resolve("buffer/"),
            "constants": require.resolve("constants-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "path": require.resolve("path-browserify"),
            "util": require.resolve("util/"),
            "net": false
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};