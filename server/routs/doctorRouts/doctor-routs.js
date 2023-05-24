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
    const doctorId = req.query.id;
    const courseCode = req.query.course_code;
    console.log(doctorId)
    console.log(courseCode);
    res.render('doctorTemplates/doctorUploadFile', { courseCode, doctorId });
})

router.get('/uploadfiles',fileUpload)


export default router;