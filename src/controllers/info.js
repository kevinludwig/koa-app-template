const fs = require('fs'),
    promisify = require('es6-promisify'),
    readFile = promisify(fs.readFile);

module.exports = async(ctx) => {
    const [packageJson, configJson] = await Promise.all([readFile('./package.json', 'utf-8'), readFile('./config/default.json', 'utf-8')]);

    ctx.body = {
        id: this.params.id,
        packageJson: packageJson,
        config: configJson
    }
}