const Koa = require('koa'),
    convert = require('koa-convert'),
    bodyParser = require('koa-bodyparser'),
    helmet = require('koa-helmet'),
    toobusy = require('koa-toobusy'),
    responseTime = require('koa-response-time'),
    kcors = require('kcors'),
    gracefulShutdown = require('http-graceful-shutdown'),
    ping = require('koa-ping'),
    accesslog = require('koa-accesslog'),
    config = require('config'),
    log = require('./logger'),
    routes = require('./routes');

let app = new Koa();

app.use(async(ctx, next) => {
    try {
        await next();
    } catch (ex) {
        log.error(ex);
        ctx.status = 500;
    }
});

app.use(responseTime());
app.use(convert(accesslog()));
app.use(convert(toobusy()));
app.use(helmet());
app.use(bodyParser());
app.use(convert(kcors()));
app.use(convert(ping(config.prefix + '/ping')));
app.use(routes);

module.exports = () => {
    return new Promise((resolve) => {
        const server = app.listen(config.port, () => {
            gracefulShutdown(server, {
                timeout: config.shutdownTimeout
            });
            resolve(server);
        });
    });
}