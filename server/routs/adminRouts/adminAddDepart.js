import {Router} from "express";
import departments_model from "../../database/models/departments_model.js";
import { allDepartments ,store } from "../../controllers/allDepartments.js";
import { faker } from "@faker-js/faker";



const router = new Router();

router.get("/",allDepartments);
router.post("/",store);




router.get("/addData",(req,res)=>{
    const departmentsArray=[];
    for(let i=0;i<5;i++){
        departmentsArray.push({
            department_name:faker.name.firstName(),
            department_code :i,
        });
    }
    departments_model.create(departmentsArray);
    res.send("done");
});




export default router;