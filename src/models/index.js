const fs = require('fs')

// const logger = require('../logger/index')
const Sequelize = require('sequelize')
// const Orders = require('./Orders')
// const RecurrentMagentoOrders = require('./RecurrentMagentoOrders')
// const RecurrentWoocommerceOrders = require('./RecurrentWoocommerceOrders')
// // const RecurrentTransactions = require('./RecurrentTransations')
// const SalesForce = require('./SalesForce')
// const LogAS400 = require('./LogAS400')
// const LogProtheus = require('./LogProtheus')
// const Token = require('./Token')
const path = require('path')

// Definitions keys is exactly the same name as tables
// const definitions = {
//     orders: Orders,
//     recurrent_magento_orders: RecurrentMagentoOrders,
//     recurrent_woocommerce_orders: RecurrentWoocommerceOrders,
//     // recurrent_transactions: RecurrentTransactions,
//     salesforce: SalesForce,
//     log_as400: LogAS400,
//     log_protheus: LogProtheus,
//     tokens: Token
// }

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
console.log(connection)


// mysql -u reactnative_app -p -h reactnativedb.igorqueiroz.com.br reactnative_app Medicina@11
// http://reactnativedb.igorqueiroz.com.br/


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
//     else if (NODE_ENV === 'PROD')
//         opts.dialectOptions = { ssl: setDBSSLCerts('config/prod') }
    
// }

// module.exports = { connection, models, setDBSSLConfig }
module.exports = { connection, models }
