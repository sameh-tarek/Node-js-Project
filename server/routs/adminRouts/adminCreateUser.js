import {Router} from "express";
import { createUser } from "../../controllers/createUser.js";
import { validateInput } from "../../middleware/validateUserCreation.js";
const router = new Router();

router.get("/",(req,res)=>{
    res.render("adminTemplates/adminHomePage",{layout : false});
   
})

router.get("/createUser",(req,res)=>{
    res.render("adminTemplates/adminCreateUser");
});

// Use the middleware function to validate input before creating a new user
router.post("/createUser", validateInput, createUser);

export default router;