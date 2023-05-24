import courses_model from "../database/models/courses_model.js"
export let findCourses;
export const loginAuth = async (req, res) => {
  try {
    const userType = req.userType;
    const doctor_id =req.body.user_code;
    console.log(userType);
    //check the user type
    if (userType == 'admin') {
      return res.render("adminTemplates/adminHomePage");
    } else if (userType == 'student') {
      return res.render("studentTemplates/studentHomePage");
    } else {  
        const findID = await courses_model.findOne( {doctor_id} ).lean();
    
        const courses=await courses_model.find({doctor_id}).lean();
        console.log(courses)
    
    
        if(!findID){
            return res.status(404).send("errorMessag");
        }
        else{
            
          return res.render('doctorTemplates/doctorHomePage', { courses }); 
        }
  }
  
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
