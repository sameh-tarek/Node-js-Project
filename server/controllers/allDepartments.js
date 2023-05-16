import departments_model from "../database/models/departments_model.js";
import courses_model from "../database/models/courses_model.js";

export const allDepartments=async(req,res)=>{
    const courses=await courses_model.find().lean();
    const departments=await departments_model.find().lean();
    res.render("adminTemplates/adminAddDepart",{layout : false,departments,courses});

}


export const store=(req,res)=>{
    console.log(req.body);
    const name=req.body.name;
    const code=req.body.code;



    departments_model.create({
        department_name : name,
        department_code : code,
    });

    res.redirect("/departments")

}