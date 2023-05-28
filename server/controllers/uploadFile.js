import multer from "multer";
import { MongoClient } from "mongodb";
import { GridFSBucket } from "mongodb";

import db from "../database/MongoDBconnection.js";
import files_model from "../database/models/files_model.js";

const bucket = new GridFSBucket(db);

// storage and file settings

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
export const upload =multer({ storage });

export const fileUpload = async (req, res) => {
    const { doctor_id, course_code } = req.body;
    const file = req.file;

    try {
        const uploadStream = bucket.openUploadStream(file.originalname);
        uploadStream.end(file.buffer);

        const fileData = {
            file_name: file.originalname,
            course_code,
            doctor_id,
            file_path: file.path
        };

        await files_model.create(fileData);
res.render("doctorTemplates/doctorUploadFile",{message:"file uploaded successfully",doctor_id,course_code});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occurred, go and check your uploaded files" });
    }
};
