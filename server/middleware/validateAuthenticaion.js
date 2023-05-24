import User from "../database/models/users_model.js";
import { loginAuth } from "../controllers/loginAuth.js";

import bcrypt from 'bcryptjs';


export const validateAuthentication = async (req, res, next) => {
    try {
      const { user_code, password } = req.body;
      const user = await User.findOne({ user_code }).lean();
  
      //check if user exists
      if (!user) {
        return res.render("loginTemplate/login", { message: "Invalid user code or password" ,color:"red"});
      }
  
      //check the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.render("loginTemplate/login", { message: "Invalid username or password",color:"red" });
      }
  
      //attach user type to request
      req.userType = user.user_type;
  
    next();
} catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  