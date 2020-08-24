import express from 'express';

import {
	getApplicationById,
	getApplicationFile,
	getApplications,
} from '../controllers/application-controllers';

const applicationRouter = express.Router();

applicationRouter.get('/', getApplications);

applicationRouter.get('/files', getApplicationFile);

applicationRouter.get('/:aid', getApplicationById);

export default applicationRouter;
