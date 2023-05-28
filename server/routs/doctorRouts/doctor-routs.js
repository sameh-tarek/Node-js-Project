import {Router} from "express";
import db from "../../database/MongoDBconnection.js";
import doctorModel from "../../database/models/doctor_model.js"
import coursesModel from "../../database/models/courses_model.js"
import {fileUpload,upload} from "../../controllers/uploadFile.js";

const router = new Router();

router.get("/",(req,res)=>{
    res.render("doctorTemplates/doctorHomePage",{layout : false});   
})

//router.post('/',findCourses);

router.post('/uploadfiles', upload.single('file'), fileUpload);

router.get("/uploadfiles", (req, res) => {
    const doctor_id = req.query.id;
    const course_code = req.query.course_code;
    console.log(doctor_id)
    console.log(course_code);
    res.render('doctorTemplates/doctorUploadFile', { course_code, doctor_id });
})

router.get('/uploadfiles',fileUpload)


export default router;