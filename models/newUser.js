const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

let UserSchema = new mongoose.Schema({
    ITNum: {
        type: String,
        default: ''
    },
    fName: {
        type: String,
        default: ''
    },
    lName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    tp: {
        type: String,
        default: ''
    },
    pwd: {
        type: String,
        default: ''
    },
    accType: {
        type: String,
        default: ''
    },
    courses: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Course'
        }
    ]
});
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function (password, dbPassword) {
    return bcrypt.compareSync(password, dbPassword);
};
module.exports = mongoose.model('User', UserSchema);