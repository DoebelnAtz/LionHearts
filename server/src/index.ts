import { checkToken, handleError, logRequests } from './middleware';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import testRouter from './routes/test-routes';
import authRouter from './routes/auth-routes';
import applicationRouter from './routes/application-routes';
import eventRouter from './routes/event-routes';
import fileRouter from './routes/file-routes';
import tokenAuthRouter from './routes/token-auth-routes';
import profileRouter from './routes/profile-routes';
config();
const port = process.env.PORT || 5000;
const app = express();

app.listen(port);

console.log(`Server started, listening on port: ${port}`);

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);
app.use('/', logRequests);
app.use('/api', checkToken);
app.use('/api/profiles', profileRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/token-auth', tokenAuthRouter);
app.use('/api/events', eventRouter);
app.use('/api/test', testRouter);
app.use(function (req, res, next) {
	res.status(404).send({ message: 'not found' });
});
app.use(handleError);
