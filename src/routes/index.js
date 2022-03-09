const route = require('express').Router()
const { 
    users, 
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
route.post('/user', users.create.bind(users))
// route.get('/order/:id', serverTools.headers, orders.getOne.bind(orders))
// route.put('/order/:id', serverTools.headers, orders.updateOne.bind(orders))
// route.delete('/order/:id', serverTools.headers, orders.deleteOne.bind(orders))

route.get('/test', (req, res) => res.status(200).send('ok'))

module.exports = route