import express from 'express';
import { check } from 'express-validator';
import { getEvents, joinEvent } from '../controllers/event-controllers';

const eventRouter = express.Router();

eventRouter.get('/', getEvents);

eventRouter.post(
	'/change_participation',
	[
		check('eventId').isNumeric().not().isEmpty(),
		check('status').isString().not().isEmpty(),
	],
	joinEvent,
);

export default eventRouter;
