import { catchErrors } from '../errors/catchErrors';
import { query, connect } from '../postgres';
import { transaction } from '../errors/transaction';
import CustomError from '../errors/customError';
import { QueryResult } from 'pg';

export const getEvents = catchErrors(async (req, res) => {
	let filter = req.query.filter;
	let events;
	switch (filter) {
		case 'upcoming':
			events = await query(
				`
			SELECT e.e_id, e.title, e.time, p.status FROM events e LEFT JOIN 
			(
			SELECT e_id, u_id, status 
			FROM event_participants WHERE u_id = $1
			) p ON p.e_id = e.e_id WHERE e.time > NOW()
			`,
				[req.decoded.u_id],
			);
			break;
		case 'past':
			events = await query(
				`
			SELECT e.e_id, e.title, e.time, p.status FROM events e LEFT JOIN 
			(
			SELECT e_id, u_id, status 
			FROM event_participants WHERE u_id = $1
			) p ON p.e_id = e.e_id WHERE e.time < NOW()
			`,
				[req.decoded.u_id],
			);
			break;
		default:
			events = await query(
				`
			SELECT e.e_id, e.title, e.time, p.status FROM events e LEFT JOIN 
			(
			SELECT e_id, u_id, status 
			FROM event_participants WHERE u_id = $1
			) p ON p.e_id = e.e_id
			`,
				[req.decoded.u_id],
			);
			break;
	}

	res.json(events.rows);
}, 'Failed to get events');

export const getEventById = catchErrors(async (req, res) => {
	const eid = req.params.eid;

	let event = await query(
		`
		SELECT e_id, title, time, u.u_id, u.username, t_id FROM events JOIN users u ON creator === u.u_id WHERE e_id = $1
	`,
		[eid],
	);

	if (!event.rows) {
		throw new CustomError(
			'Failed to find event by id',
			404,
			`Failed to get event matching id: ${eid}`,
			'Event not found',
		);
	}

	let eventComments = await query(
		`
		SELECT c_id, time, content, creator, u.username FROM comments JOIN users u ON creator = u.u_id WHERE t_id = $1
	`,
		[event.rows[0].t_id],
	);

	res.json({ ...event.rows[0], comments: eventComments.rows });
}, 'Failed to get event by id');

export const createComment = catchErrors(async (req, res) => {
	const { content } = req.body;

	let createdComment: QueryResult = {
		command: '',
		fields: [],
		oid: 0,
		rowCount: 0,
		rows: [],
	};
	const client = await connect();
	await transaction(
		async () => {
			let newThread = await query(`
				INSERT INTO threads DEFAULT VALUES returning t_id
			`);
			createdComment = await query(
				`
	            INSERT INTO comments (content, t_id, creator)
	            VALUES ($1, $2, $3) RETURNING c_id, time
	        `,
				[content, newThread.rows[0].t_id, req.decoded.u_id],
			);
		},
		client,
		'Failed to create comment',
	);
	res.status(201).json(createdComment.rows[0]);
}, 'Failed to create comment');

export const joinEvent = catchErrors(async (req, res) => {
	const { eventId, status } = req.body;
	const userId = req.decoded.u_id;

	let previousParticipation = await query(
		`
	    SELECT e_id, u_id FROM event_participants WHERE e_id = $1 AND u_id = $2
	`,
		[eventId, userId],
	);

	const client = await connect();
	await transaction(
		async () => {
			if (!previousParticipation.rows.length) {
				query(
					`
	            INSERT INTO event_participants (e_id, u_id, status)
	            VALUES($1, $2, $3)
	        `,
					[eventId, userId, status],
				);
			} else {
				query(
					`
		            UPDATE event_participants SET status=$1 WHERE e_id = $2 AND u_id = $3
		        `,
					[status, eventId, userId],
				);
			}
		},
		client,
		'Failed to join event',
	);
	res.status(201).json({ success: true });
}, 'Failed to join event');

export const createEvent = catchErrors(async (req, res) => {
	const { title, time } = req.body;

	const userId = req.decoded.u_id;

	const client = await connect();
	await transaction(
		async () => {
			let thread = await query(`
				INSERT INTO threads DEFAULT VALUES returning t_id
			`);
			if (!thread.rows) {
				throw new CustomError(
					'Failed to create event',
					500,
					'failed to create thread for event',
					'Failed to create event',
				);
			}
			await query(
				`
	            INSERT INTO events (title, creator, time, t_id) VALUES
	            ($1, $2, $3, $4);
	        `,
				[title, userId, time, thread.rows[0]],
			);
		},
		client,
		'Failed to create event',
	);
	res.status(201).json({
		title,
		creator: req.decoded.username,
		time: time,
	});
}, 'Failed to create event');
