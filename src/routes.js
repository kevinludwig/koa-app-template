import Router from 'koa-router'
import info from './controllers/info'
import config from 'config'

let router = new Router({
    prefix: config.prefix
});

router.get('/info/:id', info);

export default router.routes();