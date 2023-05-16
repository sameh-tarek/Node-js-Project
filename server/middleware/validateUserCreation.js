import User from "../database/models/users_model.js";
import { createUser } from "../controllers/createUser.js";

// Middleware function for validating user input
export const validateInput = (req, res, next) => {
  const { first_name, last_name, password, user_type, user_code } = req.body;

  // check if user code already exists in database
  User.findOne({ user_code }).lean()
    .then(userExists => {
      if (userExists) {
        return res.render("adminTemplates/adminCreateUser", { message: "Creation is invalid. User with this code already exists." });
      }

      // regular expression to match first_name and last_name fields with only 'a' to 'z'
      const nameRegex = /^[a-z]+$/i;
      const usrCodeRegex = /^\d+$/;

      // check if first_name and last_name only contain valid characters
      if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
        return res.render("adminTemplates/adminCreateUser", { message: "Invalid character in first or last name." });
      }
      if(!usrCodeRegex.test(user_code)){
        return res.render("adminTemplates/adminCreateUser", { message: "Invalid character in user code." });
      }

      // if all validations passed, call create user controller
      createUser(req, res);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ message: "An error occurred, please try again later." });
    });
};
