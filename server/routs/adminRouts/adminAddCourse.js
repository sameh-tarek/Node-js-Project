import {Router} from "express";
import courses_model from "../../database/models/courses_model.js";
import db from "../../database/MongoDBconnection.js";
import { faker } from "@faker-js/faker";
import { allCourses ,show,store} from "../../controllers/allCourses.js";


const router = new Router();

router.get("/",allCourses);
router.post("/",store);
router.get("/:code",show);










router.get("/addData",(req,res)=>{
    const departmentsArray=[];
    for(let i=0;i<5;i++){
        departmentsArray.push({
            course_name:faker.name.firstName(),
            course_code:i,
            department_id:i,
            requre_course:faker.name.firstName(),

        });
    }
    courses_model.create(departmentsArray);
    res.send("done");
});




export default router;