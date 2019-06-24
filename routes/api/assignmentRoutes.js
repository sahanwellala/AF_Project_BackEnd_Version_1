const Assignment =require('../../models/assignment.model');
module.exports = (app) => {
    app.get('/', (req, res, next) => {
        res.json();
    });

    app.get('/assignments',(req,res)=>{
        Assignment.find(function (err,assignments) {
            if(err){
                console.log(err);
            }
            else{
                res.json(assignments)
            }
        });
    });

    app.get('/assignments/:id',(req,res)=> {
        let id=req.params.id;
        Assignment.findById(id,function (err,assignments) {
            res.json(assignments);
        });
    });

    app.post('/assignments/add',(req,res)=> {
        let assignments=new Assignment(req.body);
        assignments.save()
            .then(assignments =>{
                res.status(200).json({'assignment':'Assignments added successfully'});
            })
            .catch(err => {
                res.status(400).send('adding new assignment failed');
            });
    });

    app.put('/assignments/update/:id',(req,res)=> {
        Assignment.findById(req.params.id,function (err,assignments) {
            if(!assignments){
                res.status(404).send('data is not found');
            }
            else{
                assignments.assignmentName=req.body.assignmentName;
                assignments.courseName=req.body.courseName;
                assignments.deuDate = req.body.deuDate;
                assignments.uploadFile=req.body.uploadFile;
                assignments.assignmentMarks=req.body.assignmentMarks;

                assignments.save().then(assignments => {
                    res.json('Assignment updated');
                })
                    .catch(err => {
                        res.status(400).send('Update not possible');
                    });
            }
        });
    });

    app.delete('/assignments/delete/:id',(req,res)=> {
        Assignment.findById(req.params.id,function (err,assignments) {
            if(!assignments){
                res.status(404).send('data is not found');
            }
            else{
                assignments.remove(req.params.id).then(assignments=>{
                    res.json('Assignment deleted');
                })
                    .catch(err=>{
                        res.status(400).send('Delete not possible');
                    });
            }
        });
    });
};
