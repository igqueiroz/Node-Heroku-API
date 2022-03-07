const { DataTypes } = require('sequelize')

const Token = {
  userid: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  },
  sms: DataTypes.INTEGER(6),
  email: DataTypes.INTEGER(6),
  expire_at: DataTypes.DATE
}

module.exports = Token