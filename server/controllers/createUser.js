import User from "../database/models/users_model.js";

export const createUser = async(req, res) => {
    console.log("Creating user...");

    const { first_name, last_name, password, user_type, user_code } = req.body;
  
    try {
      await User.create({
        first_name,
        last_name,
        password,
        user_type,
        user_code,
      });
  
      res.render("adminTemplates/adminCreateUser");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "An error occurred, please try again later." });
    }
  };