import express from "express";
import { engine } from 'express-handlebars';

import dotenv from "dotenv";
dotenv.config();

import adminrouts from "./routs/adminRouts/adminCreateUser.js"
import doctorrouts from "./routs/doctorRouts/doctor-routs.js"
import studentrouts from "./routs/studentRouts/student-routs.js"
import loginrouts from "./routs/login-routs.js"


const app = express();

app.use(express.urlencoded({extended:true}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

// Parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
//connect to css
// app.use(express.static('templates/loginTemplate'));
app.use(express.static('templates/adminTemplates/css'));
// app.use(express.static('templates/doctorTemplates/css'));
// app.use(express.static('templates/studentTemplates/css'));





//routing
app.use("/login",loginrouts);
app.use("/admin",adminrouts);
app.use("/doctor",doctorrouts);
app.use("/student",studentrouts);




app.listen(process.env.Port,()=>{
console.log(`app URL: http://localhost:${process.env.Port}`);
});