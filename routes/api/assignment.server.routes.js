const express = require('express');
const router = express.Router();
const assignmentModel = require('../../models/Assignment');

router.post('/insert', (req,res)=>{
         const assignmentFile = new assignmentModel(req.body);
         assignmentFile.save().then(
             data => {
                 return res.status(200).json(data);
             }
         ).catch(
             err => {
                 return res.status(400).json(err);
             }
         )

});

router.get('/', function(req,res){
    assignmentModel.find().then(
        data => {
            return res.status(200).json(data);
        }
    ).catch(
        err => {
            return res.status(400).json(err);
        }
    )
});

router.get('/find/:id', function(req,res){
    assignmentModel.findById(req.params.id).then(
        data => {
            return res.status(200).json(data);
        }
    ).catch(
        err => {
            return res.status(400).json(err);
        }
    )
});
router.put('/update/:id', function(req,res){
    assignmentModel.findOneAndUpdate(req.params.id, req.body).then(
        data => {
            return res.status(200).json(data);
        }
    ).catch(
        err => {
            return res.status(400).json(err);
        }
    )
});
router.delete('/delete/:id', function(req,res){
    assignmentModel.findOneAndDelete(req.params.id).then(
        data => {
            return res.status(200).json(data);
        }
    ).catch(
        err => {
            return res.status(400).json(err);
        }
    )
});
module.exports = router;