const Course = require('../../models/Courses');
module.exports = (app) => {
    app.get('/', (req, res, next) => {
        res.json();
    });

    app.get('/courses', (req, res) => {
        Course.find().populate('instructor', {
            fName: 1,
            lName: 1,
            email: 1,
            status: 1,
            isApproved: 1
        }).exec().then(courses => {
            return res.send({
                success: true,
                courses: courses
            })
        })
    });

    app.get('/courses/approved', (req, res) => {
        Course.find({isApproved: true}).populate('instructor', {
            fName: 1,
            lName: 1,
            email: 1
        }).exec().then(course => {
            return res.send({
                success: true,
                courses: course
            })
        })
    });

    app.get('/courses/approvedCourses', (req, res) => {
        Course.find({isApproved: true}).exec().then(course => {
            res.json(course)
        })
    });

    app.get('/courses/:name', (req, res) => {
        Course.find({name: req.params.name}).populate('instructor', {
            fName: 1,
            lName: 1,
            email: 1
        }).exec().then(courses => {
            if (courses.length > 0) {
                return res.send({
                    success: true,
                    courses: courses
                })
            } else {
                return res.send({
                    success: false,
                    message: "No Course Found on the given name"
                })
            }
        })
    })
};