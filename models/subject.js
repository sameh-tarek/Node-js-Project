import { Schema,model } from "mongoose";

const subject = new Schema({
    name: {
        type : String,
        require:true
    },

    code:{
        type : String,
        require:true,
    },

    department: {
        type : Schema.Types.ObjectId,
        require:false,
        ref: 'department',
    },

},{timestamps:true});

export default model('subject', subject);