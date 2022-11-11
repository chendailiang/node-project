
const koaStatic = require('koa-static')

// 平台方地址
const platformPath = "E:/linmao/LinkAI.Platform.Web/dist";

const static = (app) => {
    app.use(koaStatic(platformPath));

    
    app.use(koaStatic(__dirname + '/public'))
}


module.exports = static