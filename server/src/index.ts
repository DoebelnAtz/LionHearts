import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import debugAgent from '@google-cloud/debug-agent';
config();
if (process.env.NODE_ENV === 'production') {
	debugAgent.start({
		serviceContext: {enableCanary: false},
	});
}

import { checkToken, handleError, logRequests } from './middleware';
import authRouter from './routes/auth-routes';
import applicationRouter from './routes/application-routes';
import eventRouter from './routes/event-routes';
import fileRouter from './routes/file-routes';
import tokenAuthRouter from './routes/token-auth-routes';
import profileRouter from './routes/profile-routes';
import skillRouter from './routes/skill-routes';
import articleRouter from './routes/article-routes';
import path from 'path';
import { getProfileSummary } from './controllers/profile-controllers';
const port = process.env.PORT || 5000;
const app = express();

app.listen(port);

console.log(`Server started, listening on port: ${port}`);
app.use(cors());
app.use(bodyParser.json());
app.use(
	'/api/photos',
	express.static(path.join(__dirname, '../images/articles')),
);
app.use('/api/languages', express.static(path.join(__dirname, '../languages')));
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);
app.get('/api/summary', getProfileSummary);
app.use('/api/articles-no-token', articleRouter.articleNoTokenRouter);
app.use('/', logRequests);
app.use('/api', checkToken);
app.use('/api/articles', articleRouter.articleRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/skills', skillRouter);
app.use('/api/token-auth', tokenAuthRouter);
app.use('/api/events', eventRouter);
app.use(function (req, res, next) {
	res.status(404).send({ message: 'not found' });
});
app.use(handleError);
