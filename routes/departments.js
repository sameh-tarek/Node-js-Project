import { Router } from "express";
import department from "../models/department.js";

const router = new Router();

router.get('/', (req,res)=>{
    res.render('subjects/index');
})


export default router;

