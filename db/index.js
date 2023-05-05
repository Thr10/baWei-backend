const mongoose = require('mongoose')
const mongoDBHost = 
    process.env.BUILD_ENV === 'docker'
        ? 'mongodb://database'
        : 'mongodb://localhost:27017';
// const url = 'mongodb://localhost:27017';
// const dbName = 
const dbName = 'test';

mongoose.connect(`${mongoDBHost}/${dbName}`, {})

const db = mongoose.connection
// 发生错误
db.on('error', err => {
    console.error(err)
})

module.exports = mongoose;