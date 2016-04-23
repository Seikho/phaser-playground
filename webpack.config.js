module.exports = {
    entry: './src/app.js',
    devtool: 'source-map',
    output: {
        filename: 'index.js',
        path: './front/scripts'
    },
    node: {
        fs: 'empty'
    }
}