const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./newUser');


const Student_Exam_file = new Schema({
    exam_studentId:{
        type:String
    },
    exam_file:{
        type:String
    },
    exam_marks:{
        type:String
    },
    exam_state:{
        type:String
    },
    examUploadedDate:{
        type:Date,
        default:Date.now
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
});

const ExamFile = mongoose.model('student_Exam_file', Student_Exam_file);
module.exports = ExamFile;