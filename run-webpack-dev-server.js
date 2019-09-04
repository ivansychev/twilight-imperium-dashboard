const path = require('path')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

const { PORT = 8080, STUB } = process.env

const server = new WebpackDevServer(webpack(config), {
    contentBase: './target',
    port: process.env.PORT,
    overlay: true,
    hot: false,
    noInfo: false,
    historyApiFallback: true,
    stats: 'normal'
})

server.listen(PORT, null, () => {
})
