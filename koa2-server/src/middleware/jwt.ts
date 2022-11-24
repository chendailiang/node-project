import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import unless from 'koa-unless'
import { Context, Next } from 'koa'

class JWT {
    static _instance: JWT;
    screct: string;
    expiresIn: string;

    constructor({
        screct,
        expiresIn
    }: {
        screct: string,
        expiresIn: string
    }) {
        this.screct = screct;
        this.expiresIn = expiresIn
    }

    static getInstance(opts?: any) {
        if (!JWT._instance) {
            JWT._instance = new JWT(opts)
        }
        return JWT._instance
    }

}


export default {
    verify: (opts = {}) => {
        let jwtItem = JWT.getInstance(opts);
        const middleware = async (ctx: Context, next: Next) => {
            let token = ctx.headers["authorization"]?.split('Bearer ')[1];
            if (token) {
                // 如果有token的话解析
                try {
                    const tokenItem = (jsonwebtoken.verify(token, jwtItem.screct)) as JwtPayload
                    const nowTime = new Date().getTime();
                    if (nowTime <= (tokenItem?.exp as number * 1000)) {
                        await next()
                    } else {
                        ctx.code = 401;
                        ctx.body = {
                            code: 401,
                            message: 'token已过期'
                        }
                    }
                } catch (error) {
                    ctx.code = 401;
                    ctx.body = {
                        code: 401,
                        message: 'token无效'
                    }
                }
            } else {
                ctx.code = 401;
                ctx.body = {
                    code: 401,
                    message: '缺少token'
                }
            }

        }
        middleware.unless = unless;
        return middleware;
    },
    sign: (info: any) => {
        let jwtItem = JWT.getInstance();
        return jsonwebtoken.sign(info, jwtItem.screct, {
            expiresIn: jwtItem.expiresIn
        })
    }
}

