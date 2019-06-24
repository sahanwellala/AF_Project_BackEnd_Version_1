const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let Exam =new Schema({
    examName:{
        type:String
    },
    examCourseName:{
        type:String
    },
    examDeuDate:{
        type:String
    }
});
module.exports=mongoose.model('Exam',Exam);