const route = require('express').Router()
const { 
    users,
    token
    } = require('../controllers')
const Cache = require('../utils/express-tools')
const cors = require('cors')

const serverTools = {
    cors: Cache.allowedOrigins(),
    headers: Cache.setCacheHeaders(['private', 'max-age=3600']),
    recaptcha: Cache.recaptcha
}

// route.get('/users',  cors(serverTools.cors), serverTools.headers, serverTools.recaptcha, users.getAll.bind(users))
route.get('/users',  users.getAll.bind(users))
route.post('/user', users.create.bind(users)) // signup
route.get('/user/:id', users.getOne.bind(users)) // verify
route.delete('/user/:id', users.deleteOne.bind(users))

route.post('/login', users.login.bind(users)) // signin
route.get('/verify/:type/:id', token.verify.bind(token)) // verify account email/sms

module.exports = route