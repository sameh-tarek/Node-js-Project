import { Schema,model } from "mongoose";

const department = new Schema({
    name: {
        type : String,
        requisre:true
    },

    code:{
        type : String,
        require:true,
    },
},{timestamps:true});

export default model('department', department);