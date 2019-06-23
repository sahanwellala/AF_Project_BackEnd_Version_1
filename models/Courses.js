const mongoose = require('mongoose');
let CourseSchema = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    instructor: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "Waiting for Approval."
    },
    isApproved: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model("Course", CourseSchema);