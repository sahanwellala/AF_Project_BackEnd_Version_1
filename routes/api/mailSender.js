const nodemailer = require('nodemailer');
// const credentials = require('../../credentials/Properties');
module.exports = (app) => {

    //To send emails when once a new instructor is created.
    app.post('/users/send-mail', (req, res) => {

        let to = req.body.to;
        let subject = req.body.subject;
        let content = req.body.content;

        if (!to) {
            return res.send({
                success: false,
                message: 'Error : Recipient Cannot be Empty !'
            })
        }

        if (!subject) {
            return res.send({
                success: false,
                message: 'Error : Subject Cannot be Empty !'
            })
        }

        if (!content) {
            return res.send({
                success: false,
                message: 'Error : '
            })
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: credentials.email,
                pass: credentials.pwd
            }
        });

        const mailOptions = {
            from: credentials.email,
            to: to,
            subject: subject,
            html: content
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                return res.send({
                    success: true,
                    message: "Email Sent Successfully !",
                    info: info.response
                });
            }
        });

    });
};