var HTMLWebpackPlugin = require('html-webpack-plugin'),
    path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'src/main.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'./dist')
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
                test: /\.(png|jpg|gif|mp3|ogg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath:'static/',
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
        }),
        new CleanWebpackPlugin(['dist/'])
    ]
}