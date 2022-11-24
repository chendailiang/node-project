
import { Context, Next } from 'koa'
import { ErrorObject } from 'ajv'

export type validatefnType = (data: any) => ErrorObject

export default {
    genValidator: (validatefn: validatefnType) => {
        async function validator(ctx: Context, next: Next) {
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