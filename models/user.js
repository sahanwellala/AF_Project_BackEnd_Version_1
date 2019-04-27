const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    user_IT_num: {
        type: String
    },
    user_fName: {
        type: String
    },
    user_lName: {
        type: String
    },
    user_email: {
        type: String
    },
    user_address: {
        type: String
    },
    user_tp: {
        type: String
    },
    user_pwd: {
        type: String
    }
});

module.exports = mongoose.model('User', User);