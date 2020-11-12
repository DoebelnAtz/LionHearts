import express from 'express';
import { check } from 'express-validator';
import {
	createEventComment,
	createEvent,
	deleteEvent,
	getCommentsByEventId,
	getEventById,
	getEvents,
	joinEvent,
	updateEvent,
	createEventChildComment,
	getChildCommentsByCommentId, getEventParticipationList,
} from '../controllers/event-controllers';

const eventRouter = express.Router();

eventRouter.get('/', getEvents);

eventRouter.get('/comments/:eid', getCommentsByEventId);

eventRouter.get('/child_comments/:cid', getChildCommentsByCommentId);

eventRouter.get('/participants/:eid', getEventParticipationList);

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
		check('eventId').not().isEmpty().isNumeric(),
	],
	createEventComment,
);

eventRouter.post(
	'/create_child_comment',
	[
		check('content').not().isEmpty(),
		check('parentId').not().isEmpty().isNumeric(),
	],
	createEventChildComment,
);

eventRouter.post(
	'/create_event',
	[check('time').isISO8601(), check('title').isString().not().isEmpty()],
	createEvent,
);

eventRouter.put('/update_event', [check('title').not().isEmpty()], updateEvent);

eventRouter.delete('/delete_event', [check('eventId')], deleteEvent);

export default eventRouter;
