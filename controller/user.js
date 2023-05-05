const User = require("../db/models/User")
const register = async (bodyInfo) => {
    const {username, password} = bodyInfo;
    const registerInfo = await User.create({
        username,
        password,
    })
    console.log(registerInfo)

    return {
        id: registerInfo._id
    }
}

const checkPassword = async (bodyInfo) => {
    const {username, password} = bodyInfo;
    let err = false;
    if (!username || !password) {
        console.log("没有用户名")
        err = true
        return err
    }

    const queryRes = await User.find({
        username,
    })
    console.log("查询结果", queryRes)
    if (queryRes.length === 0) {
        console.log("没找到用户名")
        err = true
        return err
    }
    if (String(queryRes[0].password) !== String(password)) {
        console.log("密码错误", String(queryRes.password), String(password))
        err = true
        return err
    }  
    
    return err
}

const queryId = async (username) => {
    const queryRes = await User.find({
        username,
    })
    return queryRes[0]._id || 666
}

module.exports = {
    register,
    checkPassword,
    queryId,
}