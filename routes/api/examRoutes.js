const Exam =require('../../models/exam.model');
module.exports = (app) => {
    app.get('/', (req, res, next) => {
        res.json();
    });

    app.get('/exams', (req,res)=>{
        Exam.find(function (err,exams) {
            if(err){
                console.log(err);
            }
            else{
                res.json(exams)
            }
        });
    });

    app.get('/exams/:id',(req,res) =>{
        let id=req.params.id;
        Exam.findById(id,function (err,exams) {
            res.json(exams);
        });
    });

    app.post('/exams/add',(req,res)=> {
        let exams=new Exam(req.body);
        exams.save()
            .then(exams =>{
                res.status(200).json({'exam':'exam added successfully'});
            })
            .catch(err => {
                res.status(400).send('adding new exam failed');
            });
    });

    app.put('/exams/update/:id', (req,res) =>{
        Exam.findById(req.params.id,function (err,exams) {
            if(!exams){
                res.status(404).send('data is not found');
            }
            else{
                exams.examName=req.body.examName;
                exams.examCourseName=req.body.examCourseName;
                exams.examDeuDate = req.body.examDeuDate;
                exams.examUploadFile=req.body.examUploadFile;
                exams.examMarks=req.body.examMarks;

                exams.save().then(exams => {
                    res.json('Exam updated');
                })
                    .catch(err => {
                        res.status(400).send('Update not possible');
                    });
            }
        });
    });

    app.delete('/exams/delete/:id',(req,res)=> {
        Exam.findById(req.params.id,function (err,exams) {
            if(!exams){
                res.status(404).send('data is not found');
            }
            else{
                exams.remove(req.params.id).then(exams=>{
                    res.json('Exam deleted');
                })
                    .catch(err=>{
                        res.status(400).send('Delete not possible');
                    });
            }
        });
    });
};
