const fs = require('fs')

// const logger = require('../logger/index')
const Sequelize = require('sequelize')
const Users = require('./Users')
const Token = require('./Token')

// const Token = require('./Token')
const path = require('path')

// Definitions keys is exactly the same name as tables
const definitions = {
    users: Users,
    tokens: Token
}

// Connect Postgres Database
// Production Env Log is disable
// const logging = (process.env.NODE_ENV === "PRD") ? undefined : (...msg) => logger.info(msg)
const opts = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
        max: 1,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // logging,
    define: {
        underscored: true
    }
}

// setDBSSLConfig(opts)
const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, opts)

const models = {}
// for (const name in definitions) {
//     models[name] = connection.define(name, definitions[name], { freezeTableName: true, timestamps: false })
// }

// Relationship
// models.orders.hasMany(models.recurrent_transactions, {
//     foreignKey: 'order_id'
// })
// models.recurrent_transactions.belongsTo(models.orders)

// function setDBSSLCerts(certPath) {
//     return {
//         require: true,
//         rejectUnauthorized: false,
//         ca: fs.readFileSync(path.join(process.cwd(), `${certPath}/ca.pem`)).toString(),
//         key: fs.readFileSync(path.join(process.cwd(), `${certPath}/client-key.pem`)).toString(),
//         cert: fs.readFileSync(path.join(process.cwd(), `${certPath}/client-cert.pem`)).toString()
//     }
// }

// function setDBSSLConfig(opts) {
//     const NODE_ENV = process.env.NODE_ENV
    
//     if (NODE_ENV === 'DEV')
//         opts.dialectOptions = { ssl: setDBSSLCerts('config/dev') }
//     else if (NODE_ENV === 'HML')
//         opts.dialectOptions = { ssl: setDBSSLCerts('config/homolog') }
//     else if (NODE_ENV === 'PRD')
//         opts.dialectOptions = { ssl: setDBSSLCerts('config/prod') }
    
// }

// module.exports = { connection, models, setDBSSLConfig }
module.exports = { connection, models }
