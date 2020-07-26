import express from 'express';

const applicationRouter = express.Router();

import { uploadApplicationFile } from "../controllers/application-controllers";

applicationRouter.post(
    '/upload-file',
    uploadApplicationFile
);

export default applicationRouter;