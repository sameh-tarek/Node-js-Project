import courses_model from"../database/models/courses_model.js";

const errorMessag="<h1 >May be the ID is wrong <h1>";

export let doctor_id ;
export const findCourses=async (req,res)=>{    
    
    doctor_id = req.body.doctor_id;
    
    const findID = await courses_model.findOne( {doctor_id} ).lean();

    const courses=await courses_model.find({doctor_id}).lean();


    if(!findID){
        return res.status(404).send(errorMessag);
    }
    else{
        
        res.render('../templates/doctorTemplates/doctorHomePage.handlebars', { courses }); 
    }


};
