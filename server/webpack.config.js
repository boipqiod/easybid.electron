const path = require('path');

module.exports = {
    target: 'electron-main',
    mode: 'production',
    entry: {
        index: './app.ts',
        frontPreload: './src/preload/front.preload.ts',
        youtubePreload: './src/preload/youtube.preload.ts',
    },
    output: {
        filename: (pathData) => {
            if (pathData.chunk.name === 'index') {
                return '[name].js';
            }
            return './preload/[name].js';
        },
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.js'], // .ts 확장자를 인식하도록 설정
        fallback: {
            "path": false
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devtool: false,
};