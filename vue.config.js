const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    chainWebpack: config => {
        // GraphQL Loader
        const svgIconRule = config.module.rule('svg')
        svgIconRule.uses.clear()
        svgIconRule
            .test(/\.svg$/)
            .include.add(resolve('src/icon/svg')).end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            }).end()
        const svgFileRule = config.module.rule('file')
        svgFileRule.uses.clear()
        svgFileRule
            .test(/\.svg$/)
            .exclude.add(resolve('src/icon')).end()
            .use('file-loader')
            .loader('file-loader')
            .end()

        config.module
            .rule('url')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            .exclude.add(resolve('src/icon')).end()
            .use('url-loader')
            .loader('url-loader')
            .end()
    }
}
