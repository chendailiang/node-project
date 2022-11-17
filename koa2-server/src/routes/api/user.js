
const router = require('@koa/router')()
const UserController = require('../../controller/User')
const validator = require('../../middleware/validator')
const userValidate = require('../../validator/user')


router.prefix('/api/user');

router.post('/login', validator.genValidator(userValidate), async (ctx, next) => {
    const {
        userName,
        password
    } = ctx.request.body;
    ctx.body = await UserController.login({ userName, password });
})


router.get('/info', async (ctx, next) => {
    console.log(ctx)
    const {
        id
    } = ctx.query;
    ctx.body = 'aaa'
})

module.exports = router;