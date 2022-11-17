const Koa = require('koa');
const proxy = require('./proxy');
const routes = require('./routes');
const static = require('./static');
const { jwt } = require('./middleware/jwt')
const { koaBody } = require('koa-body');

const app = new Koa();

app.use(
    koaBody({
        multipart: true
    })
)

app.use(
    jwt({
        screct: 'abcd',
        expiresIn: '7d'
    }).unless({
        path: ['/api/user/login']
    })
)

routes(app);
static(app);
proxy(app);


app.listen(3000);

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})
