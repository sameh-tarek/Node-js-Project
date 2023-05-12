import {Router} from "express";
import db from "../../database/MongoDBconnection.js";
const router = new Router();

router.get("/",(req,res)=>{
    res.render("doctorTemplates/doctorHomePage",{layout : false});   
})





export default router;