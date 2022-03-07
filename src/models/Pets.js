const { DataTypes } = require('sequelize')
const Users = require('./Users')
const Pets = {
    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    userid: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },
    created_at: DataTypes.DATE,
    name: DataTypes.CHAR(55),
    pedigree: DataTypes.CHAR(55),
    picture_path: DataTypes.CHAR(55)
}

module.exports = Pets