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
    },
    get() {
      return undefined;
    }
  },
  cpf: DataTypes.CHAR(11),
  full_name: DataTypes.CHAR(55),
  phone: DataTypes.CHAR(11),
  picture_path: DataTypes.CHAR(55)
}

module.exports = Info