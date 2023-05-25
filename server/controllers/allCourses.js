import courses_model from "../database/models/courses_model.js";
import departments_model from "../database/models/departments_model.js";


export const allCourses=async(req,res)=>{
    const courses=await courses_model.find().lean();
    const departments=await departments_model.find().lean();

    res.render("adminTemplates/adminAddCourse",{layout : false,courses,departments});

}


export const store = (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const code = req.body.code;
    const department = req.body.department;
    const require_course = req.body.require_course;
    const doctor_id = req.body.doctor_id; // retrieve the doctor ID from the request body

    courses_model.create({
        course_name: name,
        course_code: code,
        department_id: department,
        require_course: require_course,
        doctor_id: doctor_id // include the doctor ID in the create method
    });

    res.redirect("/courses");
};

export const show=async(req,res)=>{
     const {code}=req.params;
     const mycourse= await courses_model.findById(code).populate('department_id').lean();
     console.log(mycourse);
     res.render("adminTemplates/course_info.handlebars",{mycourse})
}