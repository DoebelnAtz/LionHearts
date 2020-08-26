import { catchErrors } from '../errors/catchErrors';
import { connect, query } from '../postgres';
import { transaction } from '../errors/transaction';
import CustomError from '../errors/customError';

export const getSkillsByUserId = catchErrors(async (req, res) => {
	const userId = req.params.uid;

	let skills = await query(
		`
        SELECT s.s_id, s.title FROM skills s JOIN skill_connections sc
        ON s.s_id = sc.s_id WHERE sc.u_id = $1
    `,
		[userId],
	);

	res.json(skills.rows);
}, 'Failed to get skill by user ID');

export const getSkills = catchErrors(async (req, res) => {
	const userIdFilter = req.query.filter;

	let skills: any;
	if (userIdFilter) {
		skills = await query(
			`
       		SELECT s.title, s.s_id FROM skills s JOIN skill_connections sc
       		ON sc.s_id = s.s_id WHERE sc.u_id = $1 
    	`,
			[userIdFilter],
		);
	} else {
		skills = await query(`
       		SELECT title, s_id FROM skills
    	`);
	}

	res.json(skills.rows);
}, 'Failed to get skills');

export const createSkill = catchErrors(async (req, res) => {
	const { title } = req.body;

	const client = await connect();

	let createdSkillId: any;

	await transaction(
		async () => {
			createdSkillId = query(
				`
                INSERT INTO skills (title) VALUES ($1) RETURNING s_id
            `,
				[title],
			);
		},
		client,
		'Failed to create skill',
	);

	if (!createdSkillId?.rows) {
		throw new CustomError(
			'Failed to create skill',
			500,
			'No id returned',
			'Failed to create skill',
		);
	}

	res.status(201).json({ title, s_id: createdSkillId.rows[0] });
}, 'Failed to create skill');

export const addSkillToUser = catchErrors(async (req, res) => {
	const { userId, skillId } = req.body;

	const client = await connect();
	await transaction(
		async () => {
			query(
				`
                INSERT INTO skill_connections (s_id, u_id) 
                VALUES ($1, $2)
            `,
				[skillId, userId],
			);
		},
		client,
		'Failed to add skill to user',
	);

	res.status(201).json({ success: true });
}, 'Failed to add skill to user');
