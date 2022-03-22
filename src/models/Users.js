const { DataTypes } = require('sequelize')

const Users = {
    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    created_at: DataTypes.NOW,
    email: {
        type: DataTypes.CHAR(40),
        unique: true    
    },
    password: { 
        type: DataTypes.CHAR(90),
        get() {
            return undefined;
        }
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}

module.exports = Users