const user = require('../repositories/UsersRepository')
const utils = require('../utils/object')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class Users {
    constructor() {
    }

    async create(req, res) {
        const validEmail = utils.emailValidation(req.body.email)
        if (!validEmail) return res.status(400).send('invalid')
        //const salt = await bcrypt.genSalt(10);
        //const password = await bcrypt.hash(req.body.password, salt)
        const password = await bcrypt.hash(req.body.password, 10)
        const result = await user.create( {...req.body, ...{password}} )
        if (result.errorsLength && result.errorsLength > 0) {
            if (result.code === 'ER_DUP_ENTRY') return res.status(409).send(result)
            return res.status(400).send(result)
        }

        jwt.sign({id: result.newUser.id, email: result.newUser.email, isVerified: result.newUser.is_verified}, 
            process.env.JWT_SECRET, 
            {expiresIn: '30s'},
            (e, token) => {
                if (e) {
                    console.error(e)
                    return res.status(500).send(e) 
                }
                return res.status(200).json({token})
            }
        )
    }

    async login(req, res) {
        const { email, password } = req.body
        const validEmail = utils.emailValidation(email)
        if (!validEmail) return res.status(400).send('invalid')

        const matchUser = await this.getOne(null, null, email)
        if (matchUser.length === 0) return res.sendStatus(401)
        const { id, is_verified } = matchUser

        const isCorrect = await bcrypt.compare(password, matchUser.password);
        if (isCorrect) {
            jwt.sign({id, email, isVerified: is_verified}, 
                process.env.JWT_SECRET,
                {expiresIn: '30s'},
                (e, token) => {
                    if (e) {
                        console.error(e)
                        return res.status(500).send(e) 
                    }
                    return res.status(200).json({token})
                }
            )
        }
        else return res.sendStatus(401)
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

    async getOne(req, res, doc= null) {
        const value = req && req.params.id || doc
        const type = utils.findValueType(value)
        if (!type && res) return res.sendStatus(400)
        else if (!type && !res) return 'bad format'

        const result = await user.getOne(type, value)
        if (result.errors && result.errors > 0) {
            if (res) return res.status(400).send(result)
            return result
        }
        if (res) return res.status(200).send(result)
        return result
    }

    async deleteOne(req, res) {
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