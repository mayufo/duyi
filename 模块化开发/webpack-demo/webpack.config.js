const path = require('path');       //node系统模块

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        // path: __dirname + '/dist',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}