
import Koa from 'koa'
import proxy from './proxy'
import routes from './routes'
import staticServer from './staticServer';
import jwt from './middleware/jwt';
import { koaBody } from 'koa-body'

const app = new Koa();

app.use(
    koaBody({
        multipart: true
    })
)

app.use(
    jwt.verify({
        screct: 'abcd',
        expiresIn: '7d'
    }).unless({
        path: ['/api/user/login']
    })
)

routes(app);
staticServer(app);
proxy(app);


app.listen(3000);

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})
