const packageInfo = require('../package')
const { name, version, description } = packageInfo

const basePath = `/${name}/v${version.split('.')[0]}`

module.exports = {
    serverInfo: {
        name: name,
        version: version,
        description: description
    },
    basePath: basePath
}