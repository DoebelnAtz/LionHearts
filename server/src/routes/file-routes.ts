import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { check } from 'express-validator';

import {
	createApplication,
	deleteApplicationFile,
	getApplicationIdFiles,
	uploadApplicationFile,
} from '../controllers/application-controllers';

const fileRouter = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const path = `./member-applications/${req.params.applicationId}`;
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path);
		}
		cb(null, path || 'failed');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

fileRouter.post(
	'/upload-file/:applicationId',
	upload.single('file'),
	uploadApplicationFile,
);

fileRouter.delete(
	'/delete-file',
	[check('applicationId').not().isEmpty(), check('fileName').not().isEmpty()],
	deleteApplicationFile,
);

fileRouter.get('/:applicationId', getApplicationIdFiles);

fileRouter.post(
	'/create_application',
	[
		check('applicationId').not().isEmpty(),
		check('firstname').not().isEmpty(),
		check('lastname').not().isEmpty(),
		check('email').isEmail(),
		check('description').not().isEmpty(),
	],
	createApplication,
);

export default fileRouter;
