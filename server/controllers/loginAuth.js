
import bcrypt from 'bcryptjs';
import User from "../database/models/users_model.js";

export const loginAuth = async (req, res) => {
  const { user_code, password } = req.body;
  const user = await User.findOne({ user_code }).lean();
  console.log(user_code);

  //check if the user exist
  if (!user) {
    return res.render("loginTemplate/login", { message: "Invalid username or password" });

  }

  //check the password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.render("loginTemplate/login", { message: "Invalid username or password" });
  }
  
  //check the user type
  if (user.user_type == 'admin') {
    return res.render("adminTemplates/adminHomePage");;
  }
  else if (user.user_type == 'student') {
    return res.render("studentTemplates/studentHomePage");;
  }
  else {
    return res.render("doctorTemplates/doctorHomePage");
  }
  
}