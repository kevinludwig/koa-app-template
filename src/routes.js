const Router = require('koa-router'),
    info = require('./controllers/info'),
    config = require('config');

const router = new Router();

router.get('/info/:symbol', info);

module.exports = router.routes();
