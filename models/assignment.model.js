const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let Assignment =new Schema({
    assignmentName:{
        type:String
    },
    courseName:{
        type:String
    },
    deuDate:{
        type:String
    }
});
module.exports=mongoose.model('Assignment',Assignment);