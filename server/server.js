const routes = require('../src/routes')

const express = require('express')
const { default: axios } = require('axios')
const { connection } = require('../src/models')
class Server {
    constructor() {
    }

    healthCheck(app, paths) {
        
        app.use(`/health-check`, async (req, res) => {
            const database = 
                await connection
                    .authenticate()
                    .then(() => {
                        return 'Postgres Connection has been established successfully.'
                    })
                    .catch(err => {
                        console.error(err)
                        let msg = 'Postgres Connection error.'
                        return { err, msg }
                    })
                
            res.status(200).send({ paths, database })
        })
    }

    start(app, paths) {
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json({type: "application/json"}));
        app.use(paths.basePath, routes)
        const server = app.listen(process.env.PORT || 5000, err => {
            if (err) return console.error(err)
            const port = server.address().port
            console.info(`CORS-enabled web server - App listening on port ${port}`)
        })
    }
}

module.exports = new Server()
