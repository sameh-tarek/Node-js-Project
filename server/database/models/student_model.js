import { Schema ,model} from "mongoose";


const student = new Schema({
    student_id:{
        type: String,
        required:true,
        unique:true,
    },
    student_name:{ 
        type: String,
        required:true
    },
    password:{ 
        type: String,
        required:true
    },
    course_code:{ 
        type: [String],
        required:true,
    }
});


export default model("student",student);
