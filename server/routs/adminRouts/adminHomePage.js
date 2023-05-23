import {Router} from "express";
import users_model from "../../database/models/users_model.js";


const router = new Router();

router.get("/",(req,res)=>{
    res.render("adminTemplates/adminHomePage",{layout : false});

});



export default router;
