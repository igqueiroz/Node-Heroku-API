const db = require('../models')
const fields = require('../models/Token')

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
        const token = {
            [fields.userid]: data.id,
            [fields.sms]: 123456,
            [fields.email]: 123456,
            [fields.expire_at]: '2022-05-02'
        }
        
        const newToken = await db.models.token.build(token)
        await newToken.save({
            returning: true,
            plain: true,
            raw: true
        })
        newToken.info = newTokenInfo
        return {
            success: true,
            newToken
        }
    } catch (e) {
        return error(e)
    }
}

const getOne = async (type, value) => {
    try {
        const user = await db.models.token.findOne({ where: { userid: value } })
        console.log('user', user)
        if (user === null) return []
        return user.dataValues
    } catch (e) {
        return error(e)
    }
}

module.exports = { create, getOne }