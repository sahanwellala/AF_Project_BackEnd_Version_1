const Course = require('../../models/Courses');
const mongoose = require("mongoose");
module.exports = (app) => {
    app.get('/', (req, res, next) => {
        res.json();
    });

    app.get('/notices/:id', (req, res) => {
        let id = req.params.id;

        Course.find({instructor: id, isApproved: false}).populate("instructor", {
            fName: 1,
            lName: 1,
            email: 1
        }).exec().then(course => {
            return res.send({
                message: "success",
                data: course
            })
        })
    })

    app.put('/notices/approve/:id', (req, res) => {
        let id = req.params.id;

        Course.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {
            $set: {
                status: "Approved",
                isApproved: true
            }
        }, {new: true}, (err, updatedCourse) => {

            if (err) {
                console.log(err);
            }

            res.send({
                success: true,
                message: "Course Details Successfully Updated !",
                updated: updatedCourse
            });

        })
    })
};