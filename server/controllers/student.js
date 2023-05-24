import courseModel from "../database/models/courses_model.js";
import studentModel from '../database/models/student_model.js';
import fileModel from '../database/models/files_model.js';
import fs from 'fs';

export const index = (req,res)=>{
    res.render('studentTemplates/studentHomePage');
};

export const showStudentCourses = async(req, res)=>{
    const student_id = '200327';
    try{
        const student = await studentModel.findOne({student_id}).lean();
        const course_codes = student.course_code;
        
        const courses = await courseModel.find({ course_code: { $in: course_codes } }).lean();
        const course_data = courses.map(course => ({ name: course.course_name, code: course.course_code }));
        res.render('studentTemplates/studentCourses', {course_data});
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const showCourseDetails = async(req,res)=>{
    const {course_code} = req.params;
    try{
        const singleSubject = await courseModel.findOne({course_code}).lean();

        const subjectFiles = await fileModel.find({course_code:{$eq: singleSubject.course_code} }).lean();
        res.render('studentTemplates/courseDetails', {subject : singleSubject , materials : subjectFiles});
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
};

export const showFiles = async(req, res)=>{
    const {course_code} = req.params;
    // console.log(course_code);
    try{
        const {file_name} = req.params;
        const file = await fileModel.findOne({course_code, file_name}).lean();
        if (!file) {
            return res.status(404).send('File not found');
        }    
        const data = await fs.promises.readFile(file.file_path);
        const fileData = {
            ...file,
            data: data.toString('base64')
        };
        res.render('studentTemplates/showFile', {fileName:fileData.file_name, data: fileData.data});
    }catch (error) {
        console.error(error);
        res.status(500).send("File Not Found");
      }
};

