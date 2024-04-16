const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,// 表明該屬性不能為空
    }, 
    password: {
        type: String,
        required: true,// 表明該屬性不能為空
    }
});

let userModel = mongoose.model('users', userSchema);

module.exports = userModel;