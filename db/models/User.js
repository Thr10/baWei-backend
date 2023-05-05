const mongoose = require("../index")

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true, // 必需
        unique: true // 唯一，不能重复
    },
    password: String,
})

const User = mongoose.model('user', UserSchema)
module.exports = User