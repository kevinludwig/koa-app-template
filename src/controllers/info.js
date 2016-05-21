import {readFile} from 'fs'
import promisify from 'es6-promisify'

const _readFile = promisify(fs.readFile);

export default function* () {
    let [packageJson, configJson] = yield [_readFile('./package.json', 'utf-8'), _readFile('./config/default.json', 'utf-8')]

    this.body = {
        id: this.params.id,
        packageJson: packageJson,
        config: configJson
    }
}
