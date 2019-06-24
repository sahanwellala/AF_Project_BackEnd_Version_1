const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student_Assignment_file = new Schema({
    assignment_studentId:{
        type:String
    },
    assignment_file:{
        type:String
    },
    assignment_marks:{
        type:String
    },
    assignment_state:{
        type:String
    },
    assignmentUploadedDate:{
    type:Date,
    default:Date.now
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
});

const AssignmentFile = mongoose.model('student_Assignment_file', Student_Assignment_file);
module.exports = AssignmentFile;