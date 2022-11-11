
const history = require('connect-history-api-fallback')
const koaConnect = require('koa2-connect')
const userAPIRouter = require('./api/user')
const viewRoute = require('./views/platform')


const routes = (app) => {
    app.use(viewRoute.routes(), viewRoute.allowedMethods())



    app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())




    // 单页面应用history路由
    app.use(
        koaConnect(history({
            verbose: true,
            index: '/'
        }))
    )

}

module.exports = routes;