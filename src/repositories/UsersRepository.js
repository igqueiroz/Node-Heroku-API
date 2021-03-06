const db = require('../models')

const error = (e) => {
    let errorMsg = {
        success: false,
        message: e.message || "",
        query: e.sql || "", 
        details: e.original && e.original.sqlMessage || "",
        errorsLength: e.errors && e.errors.length || "",
        code: e.original && e.original.code || ""
    }
    console.error(errorMsg)
    return errorMsg
}

const create = async (data) => {
    try {
        const user = {
            email: data.email,
            password: data.password
        }
        const newUser = await db.models.users.build(user)
        await newUser.save({
            returning: true,
            plain: true,
            raw: true
        })
        const info = {
            userid: newUser.id,
            cpf: data.cpf,
            full_name: data.full_name,
            phone: data.phone,
            picture_path: ''
        }
        const newUserInfo = await db.models.info.build(info)
        await newUserInfo.save({
            returning: true,
            plain: true,
            raw: true
        })
        newUser.info = newUserInfo
        return {
            success: true,
            newUser
        }
    } catch (e) {
        return error(e)
    }
}

const getAll = async (limit, offset) => {
    try {
        const lmt = limit
        const off = offset
        const listUsers = await db.models.users.findAll({ limit: lmt, offset: off, order: [['id', 'ASC']],  include: db.models.info })

        return listUsers
    } catch (e) {
        return error(e)
    }
}

const getOne = async (type, value) => {
    try {
        const listByType = await db.models.users.findOne({ where: { [type]: value }, include: db.models.info })
        console.log('listByType', listByType)
        if (listByType === null) return []
        return listByType.dataValues
    } catch (e) {
        return error(e)
    }
}

const deleteOne = async (type, value) => {
    try {
        const getType = (type = 'id') ? 'userid' : type
        const deleteInfoByType = await db.models.info.destroy({ where: { [getType]: value } })
        const deleteByType = await db.models.users.destroy({ where: { [type]: value } })
        if (deleteByType == 0 && deleteInfoByType == 0) return 'Nothing to delete'
        if (deleteInfoByType == 0) return 'Nothing to delete'
        else return 'deleted'
    } catch (e) {
        return error(e)
    }
}



module.exports = { create, getAll, getOne, deleteOne }