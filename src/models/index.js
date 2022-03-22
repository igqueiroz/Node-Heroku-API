const fs = require('fs')

const Sequelize = require('sequelize')
const Users = require('./Users')
const Token = require('./Token')
const Pets = require('./Pets')
const Info = require('./Info')

// Definitions keys is exactly the same name as tables
const definitions = {
    users: Users,
    tokens: Token,
    info: Info,
    pets: Pets
}

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
    logging: process.env.NODE_ENV === "DEV",
    define: {
        underscored: true
    }
}

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, opts)

const models = {}
for (const name in definitions) {
    models[name] = connection.define(name, definitions[name], { freezeTableName: true, timestamps: false })
}

// relations
models.users.hasOne(models.info, { foreignKey: 'userid' })
models.info.belongsTo(models.users,  { foreignKey: 'userid' })

models.users.hasOne(models.tokens, { foreignKey: 'userid' })
models.tokens.belongsTo(models.users, { foreignKey: 'userid' })


module.exports = { connection, models }
