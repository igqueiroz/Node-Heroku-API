const { DataTypes } = require('sequelize')
const Users = require('./Users')

const Token = {
  userid: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
  },
  get() {
    return undefined;
  }
  },
  sms: DataTypes.INTEGER(6),
  email: DataTypes.INTEGER(6),
  expire_at: DataTypes.DATE
}

module.exports = Token