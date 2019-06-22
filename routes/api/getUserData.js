const User = require('../../models/newUser');
module.exports = (app) => {
    app.get('/', (req, res, next) => {
        res.json();
    });

    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id, {pwd: 0}).exec().then(user => {
            res.json(user || {});
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        })
    })

    app.get('/users/get-by-email/:email', (req, res) => {
        User.find({email: req.params.email}).exec().then(user => {

            return res.send({
                user: user
            })
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        })
    });
    app.get('/users/instructors/tns', (req, res) => {
        User.find({accType: 'Instructor'}, {fName: 1, lName: 1, _id: 1}).exec().then(ins => {

            return res.send({
                instructor: ins
            })
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        })
    });
};
