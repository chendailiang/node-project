
import koaStatic from 'koa-static';
import koa from 'koa'

// 平台方地址
const platformPath = "E:/linmao/LinkAI.Platform.Web/dist";

const staticServer = (app: koa) => {
    app.use(koaStatic(platformPath));

    app.use(koaStatic(__dirname + '/public'))
}


export default staticServer