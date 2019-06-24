const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const UserRoutes = express.Router();
const PORT = 4000;
const server = require("repl");
//Importing the user model schema

const assignmentRouter = require('./routes/api/assignment.server.routes');
const examRouter = require('./routes/api/exam.server.routes');


app.use(cors());
app.use(bodyParser.json());
app.use('/users', UserRoutes);

app.use('/tns/assignmentUpload', assignmentRouter);
app.use('/tns/examUpload', examRouter);

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

require('./routes/api/loginRegister')(app);
require('./routes/api/validations')(app);
require('./routes/api/getUserData')(app);
require('./routes/api/mailSender')(app);
require('./routes/api/CourseRoutes')(app);
require('./routes/api/NoticeRoutes')(app);


app.listen(PORT, function () {
    console.log("Server is Running on Port : " + PORT);
});