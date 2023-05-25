import {Router} from "express";
import { index, showStudentCourses, showCourseDetails, showFiles, showAvailableCourses, enrollCourse } from "../../controllers/student.js";

const router = new Router();
router.get('/',index);
router.get("/studentCourses", showStudentCourses);
router.get('/AvailableCourses', showAvailableCourses);
router.get('/studentCourses/:course_code', showCourseDetails);
router.get('/studentCourses/:course_code/:file_name', showFiles);
router.post('/', enrollCourse);
export default router;