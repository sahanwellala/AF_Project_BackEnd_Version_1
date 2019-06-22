const User = require('../../models/newUser');
module.exports = (app) => {
    app.post('/users/check-email', (req, res, next) => {
        let email = req.body.email;
        if (!email) {
            return res.send({
                error: "Email Cannot be Empty",
                success: false
            })
        }
        email = email.toLowerCase();
        User.find({email: email}, (err, previousUsers) => {
            if (err) {
                return res.send({
                    error: "Server Error"
                })
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    error: "Already Exists !",
                    count: previousUsers.length
                });
            }
            return res.send({
                success: true,
                count: previousUsers.length
            })
        })
    })
};