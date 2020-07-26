import multer from 'multer';
import {catchErrors} from "../errors/catchErrors";
import fs from "fs";



export const uploadApplicationFile = catchErrors(async (req, res, next) => {

    const applicationId = req.params.applicationId;

    if (!fs.existsSync(`./applications/${applicationId}`)) {
        fs.mkdirSync(`./applications/${applicationId}`)
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `./applications/${applicationId}`)
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' +file.originalname )
        }
    });

    const upload = multer({ storage: storage }).single('file');

    try {
        upload(req, res, function (err: any) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
        return res.status(200).send(req.file)

    })
    } catch (e) {
        console.log(e)
    }

}, 'failed to upload file');