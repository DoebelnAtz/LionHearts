import express from 'express';

import { getApplications } from '../controllers/application-controllers';

const applicationRouter = express.Router();

applicationRouter.get('/', getApplications);

export default applicationRouter;
