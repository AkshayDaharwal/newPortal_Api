const express = require('express');
const dotenv = require('dotenv')
const DB =  require('./config/dbConfig');
const bodyParser= require('body-parser');
const internRoute= require('./views/internRoute.js');
const attendanceRouter = require('./views/attendence.js');
const empSignup = require('./views/empSign.js');
const employeeRoute = require("./views/employee.js");
const hrRoute = require('./views/hrroute.js');
const dateTimeRoutes = require('./views/dateTimeRouter.js')
const newAddEmployee = require('./views/newEmployeeRouter.js')
const fileupload = require("express-fileupload")
const {errorHandler} = require('./middelware/errorHandler.js')
const cors = require('cors');


dotenv.config();


const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(errorHandler);
app.use(fileupload());

const PORT = process.env.PORT || 8000

app.get('/', (req, res)=>{
    res.send('API is Running');
})
app.use(cors());


app.use('/attendence',attendanceRouter);
app.use('/empsignup',empSignup);
app.use('/intern',internRoute);
app.use('/emproute', employeeRoute);
app.use('/hr',hrRoute);
app.use('/datetime', dateTimeRoutes)
app.use('/addEmployee', newAddEmployee)


app.listen(PORT, ()=>{
    console.log(`Server Running at http://localhost:8000`);
});


module.exports = app 
