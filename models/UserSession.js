const mongoose = require('mongoose');

let UserSessionSchema = new mongoose.Schema({
    userName: {
        type: String,
        default: "no-user"
    },
    fName: {
        type: String,
        default: ""
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    },
    accType: {
        type: String,
        default: ''
    },
    isLogged: {
        type: Boolean,
        default: true
    }
});
module.exports = mongoose.model('UserSession', UserSessionSchema);