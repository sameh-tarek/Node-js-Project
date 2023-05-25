import courseModel from "../database/models/courses_model.js";
import studentModel from '../database/models/student_model.js';
import fileModel from '../database/models/files_model.js';
import sucessCoursesModel from '../database/models/success_courses_model.js'
import fs from 'fs';

export const index = (req,res)=>{
    res.render('studentTemplates/studentHomePage');
};

export const showStudentCourses = async(req, res)=>{
    const user_code = '200327';
    try{
        const student = await studentModel.findOne({user_code}).lean();
        const course_codes = student.courses_id;
        
        const courses = await courseModel.find({ courses_id: { $in: course_codes } }).lean();
        const course_data = courses.map(course => ({ name: course.course_name, code: course.courses_id }));
        res.render('studentTemplates/studentCourses', {course_data});
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const showCourseDetails = async(req,res)=>{
    const {course_code} = req.params;
    try{
        const singleSubject = await courseModel.findOne({courses_id: course_code}).lean();

        const subjectFiles = await fileModel.find({course_code:{$eq: singleSubject.courses_id} }).lean();
        res.render('studentTemplates/courseDetails', {subject : singleSubject , materials : subjectFiles});
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
};

export const showFiles = async(req, res)=>{
    const {course_code} = req.params;
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

export const showAvailableCourses = async (req, res) => {
    res.send("availableCourses");
};

export const enrollCourse = async (req, res) => {
    
};