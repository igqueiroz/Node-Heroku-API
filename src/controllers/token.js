const token = require('../repositories/TokenRepository')
const utils = require('../utils/object')

class Token {
    constructor() {
    }

    async create(id) {
        const result = await token.create(id)
        if (result.errors && result.errors > 0) return result
        return result
    }

    async getOne(req, res, idOrEmail = null) {
        const value = req.params.id || idOrEmail
        const type = utils.findValueType(value)
        if (!type) return res.status(400).send('bad format!')
        
        const result = await token.getOne(type, value)
        if (result.errors && result.errors > 0) {
            if (res) return res.status(400).send(result)
            else return []
        }
        if (res) return res.status(200).send(result)
        else return result
    }

    async verify(req, res) {
        const verifyType = req.params.type
        let idExists = await this.getOne(req, null)
        const createToken = await create()
        console.log('idExists', idExists);
        console.log('verifyType', verifyType);
        return res.status(200).send(createToken);
    }
}

module.exports = new Token()