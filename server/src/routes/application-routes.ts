import express from 'express';

const applicationRouter = express.Router();

import { uploadApplicationFile } from "../controllers/application-controllers";

applicationRouter.post(
    '/upload-file/:applicationId',
    uploadApplicationFile
);

export default applicationRouter;