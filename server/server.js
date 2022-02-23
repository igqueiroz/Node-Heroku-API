const routes = require('../src/routes')

const express = require('express')
const { default: axios } = require('axios')
// const { connection } = require('../src/models')
class Server {
    constructor() {
    }

    healthCheck(app, paths) {
        
        app.use(`/health-check`, async (req, res) => {
            const database = null
                // await connection
                //     .authenticate()
                //     .then(() => {
                //         return 'Postgres Connection has been established successfully.'
                //     })
                //     .catch(err => {
                //         const result = (process.env.NODE_ENV === "PROD") ? { err } : { err, dbAddress: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}` }
                //         return result
                //     })
                
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
