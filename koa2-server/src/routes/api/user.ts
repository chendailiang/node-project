
import koaRouter from '@koa/router';
import UserController from '../../controller/User'
import validator, { validatefnType } from '../../middleware/validator'
import userValidate from '../../validator/user'

const router = new koaRouter({
    prefix: '/api/user'
})

router.post('/login', validator.genValidator(userValidate as validatefnType), async (ctx, next) => {
    const {
        userName,
        password
    } = ctx.request.body;
    ctx.body = await UserController.login(userName, password);
})


router.get('/info', async (ctx, next) => {
    console.log(ctx)
    const {
        id
    } = ctx.query;
    ctx.body = 'aaa'
})

export default router;