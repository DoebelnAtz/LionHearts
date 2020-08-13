import { catchErrors } from '../errors/catchErrors';
import { query, connect } from '../postgres';
import { transaction } from '../errors/transaction';

export const getEvents = catchErrors(async (req, res) => {
	console.log(req.decoded);
	let events = await query(
		`
        SELECT e.e_id, e.title, e.time, p.status FROM events e LEFT JOIN 
        (
        SELECT e_id, u_id, status 
        FROM event_participants WHERE u_id = $1
        ) p ON p.e_id = e.e_id
    `,
		[req.decoded.u_id],
	);

	res.json(events.rows);
}, 'Failed to get events');

export const joinEvent = catchErrors(async (req, res) => {
	const { eventId, status } = req.body;
	const userId = req.decoded.u_id;
	let event = await query(
		`
        SELECT e_id FROM events WHERE e_id=$1
    `,
		[eventId],
	);

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
