var HTMLWebpackPlugin = require('html-webpack-plugin'),
    path = require('path')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src/main.js'),
    devServer: {
        port: 80,
        host: "0.0.0.0"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /createjs\.min\.js/,
                use: ['script-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name:'[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/index.html')
        })
    ]
}