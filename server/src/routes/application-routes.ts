import express from 'express';
import multer from 'multer';
import fs from 'fs';

const applicationRouter = express.Router();

import {
	createApplication,
	deleteApplicationFile,
	getApplicationIdFiles,
	uploadApplicationFile,
} from '../controllers/application-controllers';
import { check } from 'express-validator';

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

applicationRouter.get('/');

applicationRouter.get('/files/:applicationId', getApplicationIdFiles);

applicationRouter.post(
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

applicationRouter.post(
	'/upload-file/:applicationId',
	upload.single('file'),
	uploadApplicationFile,
);

applicationRouter.delete(
	'/delete-file',
	[check('applicationId').not().isEmpty(), check('fileName').not().isEmpty()],
	deleteApplicationFile,
);

export default applicationRouter;
