const app = require('./app'),
    log = require('./logger'),
    config = require('config');

app().then(() => {
    log.info('serving on ', config.port)
});