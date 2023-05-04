import subject from "../models/subject.js";
import department from "../models/department.js";
export const index = async (req,res)=>{
    
    const subjects = await subject.find({},{ name:1}).lean();
    console.log(subjects);
    res.render('subjects/index' , {subjects});
}

export const create = async (req,res)=>{
    const departments = await department.find().lean();
    res.render('subjects/create', {departments});
}

export const store = async (req,res)=>{
    const {name , code , department}=req.body;

    await subject.create({
        name,
        code,
        department,
    });
    res.redirect('/subjects');
}

export const show = async(req,res)=>{
    //1- grap the _id
    const {_id}=req.params;
    console.log(_id);


    //2- use the _id to get the subject
    const singleSubject=await subject.findById(_id).populate('department').lean();
    console.log(singleSubject);

    //3- rener "show" View
    res.render('subjects/show', {subject:singleSubject});
    
}