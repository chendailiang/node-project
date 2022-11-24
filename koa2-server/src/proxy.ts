
import { createProxyMiddleware } from 'http-proxy-middleware';
import koaConnect from 'koa-connect';
import koa from 'koa'

const proxy = (app: koa) => {
    app.use(
        koaConnect(
            createProxyMiddleware('/api', {
                target: 'http://dev-lmdecision.codefr.com/', //测试环境
                changeOrigin: true
            })
        )
    )
}

export default proxy;