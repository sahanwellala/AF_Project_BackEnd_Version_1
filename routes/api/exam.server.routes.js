const express = require('express');
const router = express.Router();
const exam = require('../../models/Exam');

router.post('/insert', function(req,res){
    const examFile = new exam(req.body);
    examFile.save().then(
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
    exam.find().then(
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
    exam.findById(req.params.id).then(
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
    exam.findOneAndUpdate(req.params.id, req.body).then(
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
    exam.findOneAndDelete(req.params.id).then(
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