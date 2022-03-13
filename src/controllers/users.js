const user = require('../repositories/UsersRepository')
const utils = require('../utils/object')

class Users {
    constructor() {
    }

    async create(req, res) {
        const validEmail = utils.emailValidation(req.body.email)

        if (!validEmail) return res.status(400).send('invalid')
        const result = await user.create(req.body)
        if (result.errors && result.errors > 0) {
            return res.status(400).send(result)
        }
        return res.status(200).send(result)
    }
    
    async getAll(req, res) {
        if (!req.query.lmt || !req.query.off) return res.status(400).send('set a limit and and offset params')
        if (isNaN(req.query.lmt)) return res.status(400).send('invalid')
        if (isNaN(req.query.off)) return res.status(400).send('invalid')

        const result = await user.getAll(
            Math.abs(parseInt(req.query.lmt)),
            Math.abs(parseInt(req.query.off))
        )
        res.status(200).send(result)
    }

    async getOne(req, res) {
        const value = req.params.id
        const type = utils.findValueType(value)
        if (!type) return res.status(400).send('bad format!')
        
        const result = await user.getOne(type, value)
        if (result.errors && result.errors > 0) {
            return res.status(400).send(result)
        }
        return res.status(200).send(result)
    }

    async deleteOne(req, res) {
        // This method can handle emails UUIDs and Ids
        const value = req.params.id
        const type = utils.findValueType(value)
        if (!type) return res.status(400).send('bad format!')

        const result = await user.deleteOne(type, value)
        if (result.errors && result.errors > 0) {
            return res.status(400).send(result)
        }
        return res.status(200).send(result)
    }

}

module.exports = new Users()