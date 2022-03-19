const db = require('../models')

const error = (e) => {
    console.error(e)
    return {
        message: e.message || "",
        query: e.sql || "", 
        details: e.original && e.original.sqlMessage || "",
        errorsLength: e.errors && e.errors.length || "",
        code: e.original && e.original.code || ""
    }
}

const create = async (data) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.password, salt);
    try {
        const user = {
            email: data.email,
            password
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

module.exports = { create, getOne }