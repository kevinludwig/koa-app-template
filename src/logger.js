const winston = require('winston'),
    config = require('config');

module.exports = new winston.Logger({
    transports: [
        new(winston.transports.Console)({
            logstash: true,
            timestamp: true,
            stderrLevels: ['debug', 'info', 'warn', 'error']
        })
    ],
    level: config.logLevel
});