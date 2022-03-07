const { DataTypes } = require('sequelize')

const Users = {
    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    created_at: DataTypes.DATE,
    email: {
        type: DataTypes.CHAR(40),
        unique: true    
    },
    password: DataTypes.CHAR(32)
}

module.exports = Users