module.exports = {
    genValidator: (validatefn) => {
        async function validator(ctx, next) {
            const data = ctx.request.body
            const error = validatefn(data)
            if (error) {
                ctx.body = {
                    code: 500,
                    message: '数据格式校验错误'
                }
                return;
            }
            await next()
        }
        return validator
    }
}