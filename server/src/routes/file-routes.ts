import express from 'express';
import { check } from 'express-validator';
import { sendUploadToGCS } from '../middleware';
import {
	createApplication,
	deleteApplicationFile,
	getApplicationIdFiles,
	uploadFile,
} from '../controllers/application-controllers';
import {
	getProfilePicture,
	uploadProfilePicture,
} from '../controllers/profile-controllers';
import {
	getArticleImages,
	uploadApplicationFile,
} from '../controllers/file-controllers';
const Multer = require('multer');

const fileRouter = express.Router();

const multer = Multer({
	storage: Multer.MemoryStorage,
	limits: {
		fileSize: 5 * 1024 * 1024, // Maximum file size is 5MB
	},
});

fileRouter.post(
	'/upload-file/:bucket',
	multer.single('file'),
	sendUploadToGCS,
	uploadFile,
);

fileRouter.post(
	'/upload-application/:aid',
	multer.single('file'),
	uploadApplicationFile,
);

fileRouter.post(
	'/upload-profile-picture',
	multer.single('file'),
	uploadProfilePicture,
);

fileRouter.delete(
	'/delete-file',
	[check('applicationId').not().isEmpty(), check('fileName').not().isEmpty()],
	deleteApplicationFile,
);

fileRouter.get('/profile_picture', getProfilePicture);
fileRouter.get('/photos', getArticleImages);

fileRouter.get('/:aid', getApplicationIdFiles);

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
