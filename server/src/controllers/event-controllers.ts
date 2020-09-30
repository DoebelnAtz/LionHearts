import { catchErrors } from '../errors/catchErrors';
import { query, connect } from '../postgres';
import { transaction } from '../errors/transaction';
import CustomError from '../errors/customError';

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

export const getCommentsByThreadId = catchErrors(async (req, res) => {
	let threadId = req.params.tid;

	let comments = await query(
		`
		SELECT c_id, created, content, creator, u.username, u.profile_pic 
		FROM comments JOIN users u
		ON creator = u.u_id 
		WHERE parent_thread = $1
	`,
		[threadId],
	);
	res.json(comments.rows);
}, 'Failed to get comments');

export const getEventById = catchErrors(async (req, res) => {
	const eid = req.params.eid;

	let event = await query(
		`
		SELECT e.e_id, e.title, e.time, u.u_id, u.username, u.firstname, u.lastname, e.t_id FROM events e JOIN users u ON e.creator = u.u_id WHERE e.e_id = $1
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
		SELECT c_id, t_id, created, content, creator, u.username, u.profile_pic 
		FROM comments JOIN users u
		ON creator = u.u_id 
		WHERE parent_thread = $1
	`,
		[event.rows[0].t_id],
	);

	res.json({ ...event.rows[0], comments: eventComments.rows });
}, 'Failed to get event by id');

export const createComment = catchErrors(async (req, res) => {
	const { content, threadId } = req.body;

	let createdComment: any;
	const client = await connect();
	await transaction(
		async () => {
			let newThread = await query(`
				INSERT INTO threads DEFAULT VALUES returning t_id
			`);
			let newComment = await query(
				`
	            INSERT INTO comments (content, t_id, creator, parent_thread)
	            VALUES ($1, $2, $3, $4) RETURNING c_id, content, creator
	        `,
				[content, newThread.rows[0].t_id, req.decoded.u_id, threadId],
			);
			console.log(newComment.rows);
			console.log(newThread.rows);
			let creator: any;
			if (newComment) {
				creator = await query(
					`
				SELECT username, profile_pic FROM users WHERE u_id = $1
			`,
					[newComment.rows[0].creator],
				);
			}
			createdComment = { ...newComment.rows[0], ...creator.rows[0] };
		},
		client,
		'Failed to create comment',
	);
	res.status(201).json(createdComment);
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
	let createdEvent: any;
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
			let newEvent = await query(
				`
	            INSERT INTO events (title, creator, time, t_id) VALUES
	            ($1, $2, $3, $4) RETURNING e_id;
	        `,
				[title, userId, time, thread.rows[0].t_id],
			);
			createdEvent = { title, time, e_id: newEvent.rows[0].e_id };
		},
		client,
		'Failed to create event',
	);
	res.status(201).json({
		...createdEvent,
		creator: req.decoded.username,
	});
}, 'Failed to create event');
