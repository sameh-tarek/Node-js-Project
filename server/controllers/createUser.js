import User from "../database/models/users_model.js";
import Student from "../database/models/student_model.js"
import Doctor from "../database/models/doctor_model.js"

export const createUser = async(req, res) => {

    const { first_name, last_name, password, user_type, user_code } = req.body;
    if(user_type=="student"){
      try {
       await Student.create({
            first_name,
            last_name,
            user_code
        })
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occurred, please try again later." });
      }
    }

    else if(user_type=="doctor"){
      try {
       await Doctor.create({
            first_name,
            last_name,
            user_code
        })
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occurred, please try again later." });
      }
    }

    try {
      await User.create({
        first_name,
        last_name,
        password,
        user_type,
        user_code,
      });
  
      res.render("adminTemplates/adminCreateUser",{ message:"the user created successfully" ,color:"green"});
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "An error occurred, please try again later." });
    }
  };