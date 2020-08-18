import express from 'express';

import {
	getApplicationFile,
	getApplications,
} from '../controllers/application-controllers';

const applicationRouter = express.Router();

applicationRouter.get('/', getApplications);

applicationRouter.get('/files', getApplicationFile);

export default applicationRouter;
