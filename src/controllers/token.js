const token = require('../repositories/TokenRepository')
const utils = require('../utils/object')

class Token {
    constructor() {
    }

    async create(req, res) {
        // id can be a number or an email
        const idVerify = this.validateOne(req.query.id)
        const result = await token.create(idVerify)
        if (result.errors && result.errors > 0) {
            return res.status(400).send(result)
        }
        return res.status(200).send(result)
    }

    async getOne(req, res, idOrEmail = null) {
        const value = req.params.id || idOrEmail
        const type = utils.findValueType(value)
        if (!type) return res.status(400).send('bad format!')
        
        const result = await user.getOne(type, value)
        if (result.errors && result.errors > 0) {
            if (res) return res.status(400).send(result)
            else return []
        }
        if (res) return res.status(200).send(result)
        else return result
    }

    async validateOne(idOrEmail) {
        idExists = await this.getOne(null, null, idOrEmail)
        console.log('idExists', idExists !== []);
        // if exists validate it
    }

    async recreate(token) {
        console.log(token)
    }

}

module.exports = new Token()