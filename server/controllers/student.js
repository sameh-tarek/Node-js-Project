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
    const studentId = "200327";

  try {
    const student = await studentModel.findOne({ user_code: studentId }).lean();
    const enrolledCourses = student.courses_id || [];

    const eligibleCourses = await courseModel.find({requre_course: { $in: enrolledCourses.concat("None") }}).lean();
    
    const successfulCourses = await sucessCoursesModel.find({student_id: studentId}).lean();
    
      const passedCourses = successfulCourses.map(({ course_id }) => course_id).flat();
    //   console.log(passedCourses)
      const allCourses = await courseModel.find().lean();
      const availableCourses = allCourses.filter(({ courses_id }) => 

        !passedCourses.includes(courses_id) && !enrolledCourses.includes(courses_id)
      );
      res.render("studentTemplates/studentEnrollCourse", { courses: availableCourses });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve available courses",
        error: error.message
      });
    }
};

export const enrollCourse = async (req, res) => {
    try {
        const studentId = "200327"; 
        const student = await studentModel.findOne({ user_code: studentId });
        
        
        const selectedCourses = req.body.course_code; // array of course IDs selected by the student
        const enrolledCourses = student.courses_id || []; // array of course IDs the student is already enrolled in
        const newCourses = selectedCourses.filter((courseId) => !enrolledCourses.includes(courseId)); // filter out courses the student is already enrolled in
        
        const minCourses = 4; // minimum number of courses a student can enroll in
        if (student.courses_id.length + newCourses.length < minCourses) {
          throw new Error(`You must enroll in at least ${minCourses} courses.`);
        }
        const maxCourses = 6; // maximum number of courses a student can enroll in
        if (student.courses_id.length + newCourses.length > maxCourses) {
          throw new Error(`You can only enroll in a maximum of ${maxCourses} courses.`);
        }

        student.courses_id = enrolledCourses.concat(newCourses); // add new course IDs to the student's courses_id array
        await student.save(); // save the updated student document
        res.redirect('/student');
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
};