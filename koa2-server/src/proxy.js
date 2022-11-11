
const { createProxyMiddleware } = require('http-proxy-middleware');
const koaConnect = require('koa2-connect')

const proxy = (app) => {
    app.use(
        koaConnect(
            createProxyMiddleware('/api', {
                target: 'http://dev-lmdecision.codefr.com/', //测试环境
                changeOrigin: true
            })
        )
    )
}


module.exports = proxy