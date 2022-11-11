
const router = require('@koa/router')()
const UserController = require('../../controller/User')

router.prefix('/api/user');

router.post('/login', async (ctx, next) => {
    const {
        userName,
        password
    } = ctx.request.body;
    ctx.body = await UserController.login({ userName, password });
})

module.exports = router;