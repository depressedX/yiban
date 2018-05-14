var HTMLWebpackPlugin = require('html-webpack-plugin'),
    path = require('path')

module.exports = {

    entry: path.join(__dirname, 'src/main.js'),
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
                test: /\.(png|jpg|gif|mp3|ogg|webm|txt)$/,
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