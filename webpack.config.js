var HTMLWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    merge = require('webpack-merge'),
    baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        port: 80,
        host: "0.0.0.0"
    },
})