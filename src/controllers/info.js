const fs = require('fs'),
    config = require('config'),
    request = require('superagent'),
    util = require('util'),
    readFile = util.promisify(fs.readFile);

function getQuote(sym) {
    return request
        .get(config.stockHost + config.stockPath)
        .query({
            quote: sym
        });
}

module.exports = async(ctx) => {
    const [quote, pkg, conf] = await Promise.all([
        getQuote(ctx.params.symbol),
        readFile('./package.json', 'utf-8'),
        readFile('./config/default.json', 'utf-8')
    ]);

    ctx.body = {
        quote,
        pkg,
        conf
    };
}
