export const loginAuth = async (req, res) => {
  try {
    const userType = req.userType;
    console.log(userType);
    //check the user type
    if (userType == 'admin') {
      return res.render("adminTemplates/adminHomePage");
    } else if (userType == 'student') {
      return res.render("studentTemplates/studentHomePage");
    } else {
      return res.render("doctorTemplates/doctorHomePage");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
