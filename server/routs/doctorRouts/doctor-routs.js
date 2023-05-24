import {Router} from "express";
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

export default router;