import multer from 'multer';
import {catchErrors} from "../errors/catchErrors";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'applications')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
});

const upload = multer({ storage: storage }).single('file');

export const uploadApplicationFile = catchErrors(async (req, res, next) => {
    upload(req, res, function (err: any) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })
}, 'failed to upload file');