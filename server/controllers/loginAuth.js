import courses_model from "../database/models/courses_model.js"
import student_model from "../database/models/student_model.js";
export let findCourses;
export const loginAuth = async (req, res) => {
  try {
    const userType = req.userType;
    const user_code =req.body.user_code;

    console.log(userType);
    //check the user type
    if (userType == 'admin') {
      return res.render("adminTemplates/adminHomePage");
    } else if (userType == 'student') {
        const user_code =req.body.user_code;
        const student=await student_model.find({user_code}).lean();
        console.log(student);        
      return res.render("studentTemplates/studentHomePage");
    } 
    else {  
        const courses=await courses_model.find({doctor_id: user_code}).lean();
        console.log(courses);        
        return res.render('doctorTemplates/doctorHomePage', { courses }); 
  }
  
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


