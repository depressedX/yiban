var HTMLWebpackPlugin = require('html-webpack-plugin'),
    path = require('path') ,
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    merge = require('webpack-merge'),
    baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig,{
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'./gitPage')
    },
    plugins: [
        new CleanWebpackPlugin(['gitPage/'])
    ]
})