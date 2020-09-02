import express from 'express';

import {
	getApplicationById,
	getApplicationFile,
	getApplications,
	rejectApplicant,
} from '../controllers/application-controllers';
import { check } from 'express-validator';

const applicationRouter = express.Router();

applicationRouter.get('/', getApplications);

applicationRouter.get('/files', getApplicationFile);

applicationRouter.get('/:aid', getApplicationById);

applicationRouter.delete(
	'/delete_application',
	[check('applicationId').not().isEmpty()],
	rejectApplicant,
);

export default applicationRouter;
