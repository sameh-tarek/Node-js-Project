import {Router} from "express";
import db from "../../database/MongoDBconnection.js";
import doctorModel from "../../database/models/doctor_model.js"
import coursesModel from "../../database/models/courses_model.js"
import {fileUpload,upload} from "../../controllers/uploadFile.js";
import {doctor_id}  from "../../controllers/doctorCourse.js"
import {findCourses} from "../../controllers/doctorCourse.js";
const router = new Router();

router.get("/",(req,res)=>{
    res.render("doctorTemplates/doctorHomePage",{layout : false});   
})

router.post('/',findCourses);

router.post('/uploadfiles', upload.single('file'), fileUpload);

router.get("/uploadfiles", (req, res) => {
    const doctorId = doctor_id;
    const courseCode = req.query.course_code;
    console.log(doctorId)
    console.log(courseCode);
    res.render('doctorTemplates/doctorUploadFile', { courseCode, doctorId });
})

router.get('/uploadfiles',fileUpload)








// create doctor in doctors model (/doctor/createdoctor)
router.get("/createdoctor",(req,res)=>{
    doctorModel.create({
        doctor_name: "salma",
        password: "300",
        doctor_id:"200330",
        courses_id: ["is196","cs127"],
    })
    res.send("add new Doctor")
    console.log("added");

})
// create courses 
router.get("/createcourse",(req,res)=>{
coursesModel.create(
 {
    course_name:"math2",
    course_code:"s11",
    department_id:"IT",
    requre_course:["math1"],
    doctor_id:"140"
})
res.send("<h1>add course</h1>")
console.log("course added");
}) 




export default router;