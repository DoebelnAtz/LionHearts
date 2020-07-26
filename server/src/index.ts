import {checkToken, handleError, logRequests} from './middleware';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import testRouter from './routes/test-routes';
import authRouter from './routes/auth-routes';
import applicationRouter from './routes/application-routes';
config();
const port = process.env.PORT || 5000;
const app = express();

app.listen(port);

console.log(`Server started, listening on port: ${port}`);

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/', logRequests);
app.use('/api/applications', applicationRouter);
app.use('/api', checkToken);
app.use('/api/test', testRouter);
app.use(handleError);



