import express from 'express';
import { check } from 'express-validator';
import {
	createComment,
	createEvent,
	getCommentsByThreadId,
	getEventById,
	getEvents,
	joinEvent,
} from '../controllers/event-controllers';

const eventRouter = express.Router();

eventRouter.get('/', getEvents);

eventRouter.get('/comments/:tid', getCommentsByThreadId);

eventRouter.get('/:eid', getEventById);

eventRouter.post(
	'/change_participation',
	[
		check('eventId').isNumeric().not().isEmpty(),
		check('status').isString().not().isEmpty(),
	],
	joinEvent,
);

eventRouter.post(
	'/create_comment',
	[
		check('content').not().isEmpty(),
		check('threadId').not().isEmpty().isNumeric(),
	],
	createComment,
);

eventRouter.post(
	'/create_event',
	[check('time').isISO8601(), check('title').isString().not().isEmpty()],
	createEvent,
);

export default eventRouter;
