import Course from "../database/models/courses_model.js";
import Student from "../database/models/student_model.js";
import department from "../database/models/departments_model.js";

export const index = async (req,res)=>{
    
    const courses = await Course.find({},{ course_name: 1, course_code: 1 }).lean();
    console.log(courses);
    res.render('adminTemplates/attedance' , {courses});
}

export const show = async(req,res)=>{
    //1- grap the _id
    const {_id}=req.params;
    //console.log(_id);
    
    //2- use the _id to get the subject
    const singleCourse =await Course.findById(_id).lean();
    console.log(singleCourse);
    // fetch dapartmentName
    const depId=singleCourse.department_id;
    console.log(depId);
    const departmentN = await department.findOne({ _id: depId }).select('department_name');
    const departmentName=departmentN.department_name;
    console.log(departmentName);

    //fectch require Course Name with code
    const rCourseCode = singleCourse.requre_course;
    const rCourseName = await Course.findOne({course_code : rCourseCode}).select('course_name');
    const requireCourseName = rCourseName ? rCourseName.course_name : "no require";
    
    //3- rener "show" View
    res.render('adminTemplates/showCoursesInAttedance', {course:singleCourse , departmentName , requireCourseName} );
    
}

export const showAbsent = async(req,res)=>{

  //grap the course code
  const courseCode=req.params.id;
  console.log(courseCode);

  //select course name with code 
  const courseName = await Course.findOne({ course_code: courseCode }).select('course_name');
  const CourseName= courseName.course_name;
  console.log(CourseName);

  // use CourseCode to get students name and academic number 
  const students = await Student.find({ courses_id: courseCode }).select('first_name last_name user_code');
  const attendance = students.map(student => ({ 
    student_name: `${student.first_name} ${student.last_name}`,
    student_id: student.user_code,
    absent: false // default value for absent checkbox
  }));
console.log (students);
  //3- rener "show" View
  res.render('adminTemplates/showAttedanceBySubjectCode', { CourseName, attendance} );
  
}

