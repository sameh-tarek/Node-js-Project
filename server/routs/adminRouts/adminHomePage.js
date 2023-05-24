import {Router} from "express";


const router = new Router();

router.get("/",(req,res)=>{
    res.render("adminTemplates/adminHomePage",{layout : false});

});



export default router;
