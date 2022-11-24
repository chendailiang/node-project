
import history from 'connect-history-api-fallback';
import koaConnect from 'koa-connect';
import userAPIRouter from './api/user'
import viewRoute from './views/platform'
import koa from 'koa'



const routes = (app: koa) => {
    app.use(viewRoute.routes())



    app.use(userAPIRouter.routes())

    // 单页面应用history路由
    app.use(
        koaConnect(history({
            verbose: true,
            index: '/'
        }))
    )

}

export default routes;