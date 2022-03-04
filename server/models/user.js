const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        req: true
    },
    email: {
        type: String,
        req: true
    },
    password: {
        type: String,
        req: true

    },



})

module.exports = mongoose.model('User', userSchema)