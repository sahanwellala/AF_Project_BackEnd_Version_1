const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const UserRoutes = express.Router();
const PORT = 4000;
const server = require("repl");

//Importing the user model schema
let UserModel = require('./models/user');


app.use(cors());
app.use(bodyParser.json());
app.use('/users', UserRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/tns', {useNewUrlParser: true})
    .then(() => {
        return server.start();
    }).catch(err => {
    console.error(err);
    process.exit(1);
});

const connection = mongoose.connection;

connection.once('open', function () {
    console.log('MongoDB database connection established successfully');
});

app.get('/', (req, res, next) => {
    res.json();
});

app.get('/users', (req, res) => {
    UserModel.find().exec().then(users => {
        res.json(users);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

app.get('/users/:id', (req, res) => {
    UserModel.findById(req.params.id).exec().then(user => {
        res.json(user || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

app.post('/users', (req, res) => {
    const user = new UserModel(req.body);
    user.save().then(user => {
        res.json(user);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

app.put('/users/:id', (req, res) => {
    const user = new UserModel(req.body);
    UserModel.findByIdAndUpdate(req.params.id, user).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

app.delete('/users/:id', (req, res) => {
    UserModel.findByIdAndRemove(req.params.id).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

app.post('/users/login-check', (req, res) => {
    let uName = req.body.login_user_name;
    let uPwd = req.body.login_pwd;

    UserModel.findOne({user_IT_num: uName, user_pwd: uPwd}, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).send();
        }
        if (!user) {
            res.status(404).json({status: 404});
        }
        res.status(200).json({status: 200, userName: user.user_fName});
    }).catch(err => {
        console.error(err);
    })
});

app.listen(PORT, function () {
    console.log("Server is Running on Port : " + PORT);
});