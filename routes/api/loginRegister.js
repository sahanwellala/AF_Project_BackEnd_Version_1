const User = require('../../models/newUser');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
    app.post('/users/create-user', (req, res, next) => {
        let ITNum = req.body.ITNum;
        let fName = req.body.fName;
        let lName = req.body.lName;
        let email = req.body.email;
        let address = req.body.address;
        let tp = req.body.tp;
        let pwd = req.body.pwd;
        let accType = req.body.accType;

        if (!fName) {
            return res.send({
                success: false,
                message: 'Error : First Name Cannot be Empty !'
            });
        }
        if (!lName) {
            return res.send({
                success: false,
                message: 'Error : Last Name Cannot be Empty !'
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error : Email Cannot be Empty !'
            });
        }
        if (!address) {
            return res.send({
                success: false,
                message: 'Error : Address Cannot be Empty !'
            });
        }
        if (!tp) {
            return res.send({
                success: false,
                message: 'Error : TP Cannot be Empty !'
            });
        }
        if (!pwd) {
            return res.send({
                success: false,
                message: 'Error : Password Cannot be Empty !'
            });
        }

        email = email.toLowerCase();

        User.find({email: email}, (err, previousUsers) => {
            if (err) {
                return res.send('Error : Server Error !');
            } else if (previousUsers.length > 0) {
                return res.send('Error : Account Already exists !');
            }
            const newUser = new User();
            newUser.ITNum = ITNum;
            newUser.fName = fName;
            newUser.lName = lName;
            newUser.email = email;
            newUser.address = address;
            newUser.tp = tp;
            newUser.pwd = newUser.generateHash(pwd);
            newUser.accType = accType;
            //newUser.courses = [];
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error : Server Error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Successfully Registered !',
                    user: user
                })
            })
        })
    });

    app.put('/users/update/profile', (req, res) => {
        let data = req.body;
        let fName = data.fName;
        let lName = data.lName;
        let email = data.email;
        let address = data.address;
        let tp = data.tp;

        if (!fName) {
            return res.send({
                success: false,
                message: 'Error : First Name Cannot be Empty !'
            });
        }
        if (!lName) {
            return res.send({
                success: false,
                message: 'Error : Last Name Cannot be Empty !'
            });
        }

        if (!address) {
            return res.send({
                success: false,
                message: 'Error : Address Cannot be Empty !'
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error : Email Cannot be Empty !'
            });
        }
        if (!tp) {
            return res.send({
                success: false,
                message: 'Error : TP Cannot be Empty !'
            });
        }

        User.findOneAndUpdate({email: email}, {
            $set: {
                fName: fName,
                lName: lName,
                address: address,
                tp: tp,
            }
        }, {new: true}, (err, updateUser) => {

            if (err) {
                console.log(err);
            }

            res.send({
                success: true,
                message: "User Details Successfully Updated !",
                updated: updateUser
            });

        })

    });

    app.post('/users/create-member', (req, res) => {

        let fName = req.body.fName;
        let lName = req.body.lName;
        let email = req.body.email;
        let address = req.body.address;
        let tp = req.body.tp;
        let pwd = req.body.pwd;
        let accType = req.body.accType;
        let ITNum = req.body.ITNum;

        if (!fName) {
            return res.send({
                success: false,
                message: 'Error : First Name Cannot be Empty !'
            });
        }
        if (!lName) {
            return res.send({
                success: false,
                message: 'Error : Last Name Cannot be Empty !'
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error : Email Cannot be Empty !'
            });
        }
        if (!address) {
            return res.send({
                success: false,
                message: 'Error : Address Cannot be Empty !'
            });
        }
        if (!tp) {
            return res.send({
                success: false,
                message: 'Error : TP Cannot be Empty !'
            });
        }
        if (!pwd) {
            return res.send({
                success: false,
                message: 'Error : Password Cannot be Empty !'
            });
        }
        if (!accType) {
            return res.send({
                success: false,
                message: 'Error : Account type cannot be Empty !'
            })
        }

        email = email.toLowerCase();

        User.find({email: email}, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error : Server Error !'
                });
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error : Account Already exists !'
                });
            }
            const newUser = new User();
            newUser.fName = fName;
            newUser.lName = lName;
            newUser.email = email;
            newUser.address = address;
            newUser.tp = tp;
            newUser.pwd = newUser.generateHash(pwd);
            newUser.accType = accType;
            newUser.ITNum = ITNum;
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error : Server Error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Successfully Registered !',
                    user: user
                })
            })
        })
    });

    app.put('/users/update-member', (req, res) => {
        let data = req.body;
        let email = data.email;
        let fName = data.fName;
        let lName = data.lName;
        let address = data.address;
        let tp = data.tp;
        let pwd = data.pwd;
        let accType = data.accType;

        if (!fName) {
            return res.send({
                success: false,
                message: 'Error : First Name Cannot be Empty !'
            });
        }
        if (!lName) {
            return res.send({
                success: false,
                message: 'Error : Last Name Cannot be Empty !'
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error : Email Cannot be Empty !'
            });
        }
        if (!address) {
            return res.send({
                success: false,
                message: 'Error : Address Cannot be Empty !'
            });
        }
        if (!tp) {
            return res.send({
                success: false,
                message: 'Error : TP Cannot be Empty !'
            });
        }
        if (!accType) {
            return res.send({
                success: false,
                message: 'Error : Account type cannot be Empty !'
            })
        }
        if (!pwd) {
            User.findOneAndUpdate({email: email}, {
                $set: {
                    fName: fName,
                    lName: lName,
                    address: address,
                    tp: tp,
                    accType: accType
                }
            }, {new: true}, (err, updateUser) => {

                if (err) {
                    console.log(err);
                }

                res.send({
                    success: true,
                    message: "User Details Successfully Updated !",
                    updated: updateUser
                });

            })

        } else {


            let updatingUser = new User();
            updatingUser.pwd = updatingUser.generateHash(pwd);
            email = email.toLowerCase();

            User.findOneAndUpdate({email: email}, {
                $set: {
                    fName: fName,
                    lName: lName,
                    address: address,
                    tp: tp,
                    pwd: updatingUser.pwd,
                    accType: accType
                }
            }, {new: true}, (err, updateUser) => {

                if (err) {
                    console.log(err);
                }

                res.send({
                    success: true,
                    message: "User Details Successfully Updated !",
                    updated: updateUser
                });

            })
        }

    });

    app.delete('/users/delete/:email', (req, res) => {
        let email = req.params.email;

        if (!email) {
            return res.send({
                success: false,
                message: "Email Cannot be Empty !",
            })
        }

        User.findOneAndDelete({email: email}).then((delUser) => {
            return res.send({
                success: true,
                deletedUser: delUser
            })
        })
    });

    app.post('/users/login-check', (req, res, next) => {

        let email = req.body.user_email;
        let pwd = req.body.user_pwd;

        if (!email) {
            return res.send({
                success: false,
                message: 'Error : Email Cannot be Empty !'
            });
        }
        if (!pwd) {
            return res.send({
                success: false,
                message: 'Error : Password Cannot be Empty !'
            });
        }
        User.find({email: email}, (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error : Server Error'
                });
            }
            if (users.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error : Invalid'
                });
            }

            const user = users[0];
            if (!user.validPassword(pwd, user.pwd)) {
                return res.send({
                    success: false,
                    message: 'Error : Invalid'
                });
            }

            //Other wise the correct user
            const userSession = new UserSession();
            userSession.userName = user.email;
            userSession.fName = user.fName;
            userSession.accType = user.accType;
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error : Server Error'
                    })
                }
                return res.send({
                    success: true,
                    message: 'Valid Login',
                    userID: user.id,
                    email: user.email,
                    fName: user.fName,
                    accType: user.accType,
                    token: doc.id,
                    isLogged: doc.isLogged
                })
            })

        });

    });

    app.post('/users/user-data/credential-request', (req, res) => {
        let token = req.body.token;
        let email = req.body.email;
        let pwd = req.body.pwd;
        UserSession.findById({_id: token}, null, null, (err, loggedUser) => {
            if (err) {
                console.error(err);
                res.send({
                    error: err,
                    Message: 'Error 01'
                })
            }
            if (loggedUser.isLogged) {
                User.find({email: email}, (err, users) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: 'Error : Server Error'
                        });
                    }
                    if (users.length !== 1) {
                        return res.send({
                            success: false,
                            message: 'Error : Password did not matched !'
                        });
                    }

                    const user = users[0];
                    if (!user.validPassword(pwd, user.pwd)) {
                        return res.send({
                            success: false,
                            message: 'Error : Passwords did not matched'
                        });
                    }

                    res.send({
                        message: 'Password Matches',
                        success: true
                    })
                });
            } else {
                res.send({
                    Message: 'Please Log in again to continue',
                    user: loggedUser
                })
            }
        })
    });

    app.post('/users/user-data/credential-request/change-pwd', (req, res) => {
        let email = req.body.email;
        let newPassword = req.body.newPwd;
        const newUser = new User();
        let hashPwd = newUser.generateHash(newPassword);
        User.findOneAndUpdate({email: email}, {$set: {pwd: hashPwd}}, {new: true}, (err, doc) => {
            if (err) {
                console.error(err);
            }
            res.send({
                newData: doc,
                success: true
            })
        })
    });

    app.post('/users/log-out', (req, res) => {
        let tokenID = req.body.token;
        UserSession.findOneAndUpdate({
            _id: tokenID,
            isLogged: true
        }, {
            $set: {isLogged: false}
        }, null, (err, userSession) => {
            if (err) {
                console.error(err);
                return res.send({
                    success: false,
                    error: "Error : Server Error !"
                })
            }
            return res.send({
                success: true,
                message: "Logged Out Successfully !"
            })

        })
    });

    app.put('/users/courses/:id', (req, res) => {
        let courses = req.body.courses;
        User.findOneAndUpdate({_id: req.params.id}, {$push: {courses: courses}}, (err, updated) => {
            if (err) {
                console.error(err)
            } else {
                return res.send({
                    success: true,
                    message: "Successfully Enrolled to the Course !"
                })
            }
        })
    });

    app.put('/users/courses/unenroll/:id', (req, res) => {
        let courses = req.body.courses;
        User.findOneAndUpdate({_id: req.params.id}, {$pull: {courses: courses}}, (err, updated) => {
            if (err) {
                console.error(err)
            } else {
                return res.send({
                    success: true,
                    message: "Successfully Un Enrolled !",
                    update: updated
                })
            }
        })
    });

    app.get('/users/courses/:email', (req, res) => {
        User.find({email: req.params.email, accType: "Student"}, {courses: 1}).populate("courses", {
            name: 1,
            description: 1,
            instructor: 1
        }).exec().then(courses => {
            return res.send({
                success: true,
                courses: courses
            })
        })
    })

};