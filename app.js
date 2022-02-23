"use script"

const express = require('express')
const app = express()
const { server, paths } = require('./server')
// const swagger = require('./swagger/index')

// swagger(app)

server.healthCheck(app, paths)
server.start(app, paths)

module.exports = app