import {Router} from "express";
import { index, showStudentCourses, showCourseDetails, showFiles } from "../../controllers/student.js";

const router = new Router();
router.get('/',index);
router.get("/studentCourses", showStudentCourses);

router.get('/studentCourses/:course_code', showCourseDetails);
router.get('/studentCourses/:course_code/:file_name', showFiles);

export default router;