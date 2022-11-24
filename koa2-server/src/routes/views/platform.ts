import koaRouter from '@koa/router';
import fs from 'fs';

const router=new koaRouter({
    prefix:'/api/user'
})

const platformPath = "E:/linmao/LinkAI.Platform.Web/dist";

router.get('/', async (ctx, next) => {
    ctx.set("Content-Type", "text/html");
    ctx.body = fs.readFileSync(platformPath + '/index.html');
})

export default router;

