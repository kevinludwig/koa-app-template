const Router = require('koa-router'),
    info = require('./controllers/info'),
    config = require('config');

let router = new Router({
    prefix: config.prefix
});

router.get('/info/:symbol', info);

module.exports = router.routes();