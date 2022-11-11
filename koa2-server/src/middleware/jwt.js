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

const jwt = (opts = {}) => {
    let jwtItem = JWT.getInstance(opts);
    const middleware = async (ctx, next) => {
        let token = ctx.request.headers["authorization"]?.spilt('Bearer ')[1];
        if (token) {
            // 如果有token的话解析
            const tokenItem = jsonwebtoken.verify(token, jwtItem.screct)
            if (tokenItem) {
                ctx.code = 401;
                ctx.body = {
                    status: 401,
                    message: 'token无效'
                }
            } else {
                //  把创建时间和过期时间析构出来
                const { time, timeout } = tokenItem
                // 拿到当前时间
                let nowTime = new Date.getTime()
                if (nowTime - time <= timeout) {
                    await next()
                } else {
                    ctx.code = 401;
                    ctx.body = {
                        status: 401,
                        message: 'token已过期'
                    }
                }
            }
        } else {
            ctx.code = 401;
            ctx.body = {
                status: 401,
                message: '缺少token'
            }
        }

    }
    middleware.unless = unless;
    return middleware;
}

const sign = (info) => {
    let jwtItem = JWT.getInstance();
    return jsonwebtoken.sign(info, jwtItem.screct, {
        expiresIn: jwtItem.expiresIn
    })
}


module.exports = {
    jwt,
    sign
}

