
const router = require('@koa/router')()
const fs = require('fs')


const platformPath = "E:/linmao/LinkAI.Platform.Web/dist";

router.get('/', async (ctx, next) => {
    ctx.set("Content-Type", "text/html");
    ctx.body = fs.readFileSync(platformPath + '/index.html');
})

module.exports = router;

