const { DataTypes } = require('sequelize')
const Users = require('./Users')
const Info = {
  userid: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    references: {
        model: Users,
        key: 'id'
    }
  },
  cpf: DataTypes.INTEGER(11),
  full_name: DataTypes.INTEGER(11),
  phone: DataTypes.CHAR(11),
  picture_path: DataTypes.CHAR(55)
}

module.exports = Info