const jsonwebtoken = require('jsonwebtoken');
const unless = require('koa-unless')

class JWT {
    constructor({
        screct,
        expiresIn
    }) {
        this.screct = screct;
        this.expiresIn = expiresIn
    }

    static getInstance(opts) {
        if (!JWT._instance) {
            JWT._instance = new JWT(opts)
        }
        return JWT._instance
    }

}


module.exports = {
    jwt: (opts = {}) => {
        let jwtItem = JWT.getInstance(opts);
        const middleware = async (ctx, next) => {
            let token = ctx.headers["authorization"]?.split('Bearer ')[1];
            if (token) {
                // 如果有token的话解析
                try {
                    const tokenItem = jsonwebtoken.verify(token, jwtItem.screct)
                    const nowTime = new Date().getTime();
                    if (nowTime <= (tokenItem.exp * 1000)) {
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
    sign: (info) => {
        let jwtItem = JWT.getInstance();
        return jsonwebtoken.sign(info, jwtItem.screct, {
            expiresIn: jwtItem.expiresIn
        })
    }
}

