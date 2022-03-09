const route = require('express').Router()

const Cache = require('../utils/express-tools')
const cors = require('cors')

const serverTools = {
    cors: Cache.allowedOrigins(),
    headers: Cache.setCacheHeaders(['private', 'max-age=3600']),
    recaptcha: Cache.recaptcha
}

// route.get('/orders', serverTools.headers, orders.getAll.bind(orders))

// Update de 
// route.post('/order', serverTools.headers, orders.create.bind(orders))
// route.get('/order/:id', serverTools.headers, orders.getOne.bind(orders))
// route.put('/order/:id', serverTools.headers, orders.updateOne.bind(orders))
// route.delete('/order/:id', serverTools.headers, orders.deleteOne.bind(orders))

route.get('/test', (req, res) => res.status(200).send('ok'))

module.exports = route