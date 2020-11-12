import { catchErrors } from '../errors/catchErrors';
import { query, connect } from '../postgres';
import { transaction } from '../errors/transaction';
import CustomError from '../errors/customError';
import { sendToAllSubscriptions, sendToUser } from '../utils';

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
			) p ON p.e_id = e.e_id WHERE e.time > NOW() ORDER BY e.time DESC
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
			) p ON p.e_id = e.e_id WHERE e.time < NOW() ORDER BY e.time DESC
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
			) p ON p.e_id = e.e_id ORDER BY e.time DESC
			`,
				[req.decoded.u_id],
			);
			break;
	}

	res.json(events.rows);
}, 'Failed to get events');

export const getCommentsByEventId = catchErrors(async (req, res) => {
	let eventId = req.params.eid;

	let comments = await query(
		`
		SELECT c_id, created, content, creator, u.username, u.profile_pic 
		FROM comments LEFT JOIN users u
		ON creator = u.u_id 
		WHERE e_id = $1
	`,
		[eventId],
	);
	res.json(comments.rows);
}, 'Failed to get comments');

export const getChildCommentsByCommentId = catchErrors(async (req, res) => {
	let commentId = req.params.cid;

	let comments = await query(
		`
		SELECT cc_id, created, content, 
		COALESCE(creator, 0) as creator, 
		COALESCE(u.username, 'deleted') as username, 
		u.profile_pic 
		FROM child_comments LEFT JOIN users u
		ON creator = u.u_id 
		WHERE parent = $1
	`,
		[commentId],
	);
	res.json(comments.rows);
}, 'Failed to get child comments');

export const getEventById = catchErrors(async (req, res) => {
	const eid = req.params.eid;

	let event = await query(
		`
		SELECT e.e_id, e.title, e.time, u.u_id, COALESCE(u.username, 'deleted') AS username, 
		COALESCE(u.firstname, 'user deleted') AS firstname, 
		COALESCE(u.lastname, '') AS lastname 
		FROM events e LEFT JOIN users u ON e.creator = u.u_id WHERE e.e_id = $1
	`,
		[eid],
	);

	let participants = await query(
		`
		SELECT u.username, u.firstname, u.lastname, u.profile_pic, u.u_id FROM users u JOIN event_participants ep ON ep.u_id = u.u_id WHERE ep.e_id = $1 
	`,
		[eid],
	);

	if (!event.rows.length) {
		throw new CustomError(
			'Failed to find event by id',
			404,
			`Failed to get event matching id: ${eid}`,
			'Event not found',
		);
	}

	let eventComments = await query(
		`
		SELECT c_id, created, 
	  content, creator, 
	  COALESCE(u.username, '[deleted]') as username, 
	  u.profile_pic, COALESCE(children, 0) as children 
	  FROM comments LEFT JOIN users u
	  ON creator = u.u_id 
	  LEFT JOIN 
	  (SELECT COUNT(*) as children, parent 
	  FROM child_comments GROUP BY parent) cc 
	  ON cc.parent = c_id 
	  WHERE e_id = $1; 
	`,
		[eid],
	);

	res.json({
		...event.rows[0],
		comments: eventComments.rows,
		participants: participants.rows,
	});
}, 'Failed to get event by id');

export const getEventParticipationList = catchErrors(async(req, res) => {

	const eventId = req.params.eid;

	let participants = await query(`
		SELECT u.username, u.lastname, u.firstname, u.profile_pic, u.username, u.u_id, 
  ep.status
  FROM users u LEFT JOIN event_participants ep ON ep.u_id = u.u_id AND ep.e_id = $1;
	`, [eventId]);

	res.json(participants.rows)
}, 'Failed to get event participants');

export const createEventComment = catchErrors(async (req, res) => {
	const { content, eventId } = req.body;
	let event = await query(
		`
		SELECT e_id, title FROM events WHERE e_id = $1
	`,
		[eventId],
	);
	if (!event.rows.length) {
		throw new CustomError(
			'No event matching given id',
			304,
			'No event matching given id',
		);
	}
	let createdComment: any;
	const client = await connect();
	await transaction(
		async () => {
			let newComment = await query(
				`
	            INSERT INTO comments (content, creator, e_id)
	            VALUES ($1, $2, $3) RETURNING c_id, content, creator, created
	        `,
				[content, req.decoded.u_id, eventId],
			);

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
	let participants = await query(
		`
		SELECT ep.u_id FROM event_participants ep WHERE ep.e_id = $1 AND ep.status = 'going' 
	`,
		[eventId],
	);
	try {
		participants.rows.forEach((participant) => {
			sendToUser(
				{
					title: 'New comment',
					body: `${req.decoded.username} commented on ${event.rows[0].title}`,
					data: {
						link: `/members/events/${eventId}`,
					},
				},
				participant.u_id,
				req.decoded.u_id,
			);
		});
	} catch (e) {
		throw new CustomError('Failed to create comment', 500);
	}

	res.status(201).json(createdComment);
}, 'Failed to create comment');

export const createEventChildComment = catchErrors(async (req, res) => {
	const { content, parentId } = req.body;
	let parentComment = await query(
		`
		SELECT c.c_id, c.creator, c.e_id, u.username 
		FROM comments c JOIN users u ON u.u_id = c.creator
		WHERE c.c_id = $1
	`,
		[parentId],
	);
	if (!parentComment.rows.length) {
		throw new CustomError(
			'No event matching given id',
			304,
			'No event matching given id',
		);
	}
	let createdComment: any;
	const client = await connect();
	await transaction(
		async () => {
			let newComment = await query(
				`
	            INSERT INTO child_comments (content, creator, parent)
	            VALUES ($1, $2, $3) RETURNING cc_id, content, creator, created
	        `,
				[content, req.decoded.u_id, parentId],
			);

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
	await sendToUser(
		{
			title: 'New comment',
			body: `${req.decoded.username} replied to your comment`,
			data: {
				link: `/members/events/${parentComment.rows[0].e_id}`,
			},
		},
		parentComment.rows[0].creator,
		req.decoded.u_id,
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
				await query(
					`
	            INSERT INTO event_participants (e_id, u_id, status)
	            VALUES($1, $2, $3)
	        `,
					[eventId, userId, status],
				);
			} else {
				await query(
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
			let newEvent = await query(
				`
	            INSERT INTO events (title, creator, time) VALUES
	            ($1, $2, $3) RETURNING e_id;
	        `,
				[title, userId, time],
			);
			createdEvent = { title, time, e_id: newEvent.rows[0].e_id };
		},
		client,
		'Failed to create event',
	);
	await sendToAllSubscriptions(
		{
			title: 'New event',
			body: `A new event ${title} has been added`,
			data: {
				link: `/members/events/${createdEvent.e_id}`,
			},
		},
		req.decoded.u_id,
	);
	res.status(201).json({
		...createdEvent,
		creator: req.decoded.username,
	});
}, 'Failed to create event');

export const updateEvent = catchErrors(async (req, res) => {
	const { title, eventId } = req.body;
	await query(
		`
		UPDATE events SET title = $1 WHERE e_id = $2
	`,
		[title, eventId],
	);

	res.json({ success: true });
}, 'Failed to update event');

export const deleteEvent = catchErrors(async (req, res) => {
	const { eventId } = req.body;
	const client = await connect();
	await transaction(
		async () => {
			try {
				await query(
					`
				DELETE FROM events WHERE e_id = $1
				`,
					[eventId],
				);
			} catch (e) {
				console.log(e);
				throw new CustomError(
					`Failed to delete event`,
					500,
					e,
					'Something went wrong',
				);
			}
		},
		client,
		'Failed to delete event',
	);

	res.json({ success: true });
}, 'Failed to delete event');
