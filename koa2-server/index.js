const Koa = require('koa');
const koaStatic = require('koa-static')
const history = require('connect-history-api-fallback')
const koaConnect = require('koa2-connect')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = new Koa();
const koaRouter = require('@koa/router')()
const fs = require('fs')

const rootPath = "E:/linmao/LinkAI.Platform.Web/dist"

app.use(koaStatic(rootPath))

koaRouter.get('/', async (ctx, next) => {
    ctx.set("Content-Type", "text/html");
    ctx.body = fs.readFileSync(rootPath + '/index.html');
    next();
})

app.use(
    koaConnect(history({
        verbose: true,
        index: '/'
    }))
)


app.use(koaRouter.routes(), koaRouter.allowedMethods())

app.use(koaConnect(
    createProxyMiddleware('/api', {
        target: 'http://dev-lmdecision.codefr.com/', //测试环境
        changeOrigin: true
    })
))

app.listen(3000);