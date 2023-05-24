import { Router } from "express";
import { loginAuth } from "../controllers/loginAuth.js"
import {validateAuthentication} from"../middleware/validateAuthenticaion.js"
const router = new Router();

router.get("/", (req, res) => {
  res.render("loginTemplate/login");
});

router.post('/',validateAuthentication ,loginAuth);

export default router;
