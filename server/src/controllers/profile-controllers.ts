import { catchErrors } from '../errors/catchErrors';
import fs from 'fs';
import path from 'path';
import { connect, query } from '../postgres';
import { transaction } from '../errors/transaction';

const mime = {
	html: 'text/html',
	txt: 'text/plain',
	css: 'text/css',
	gif: 'image/gif',
	jpg: 'image/jpeg',
	png: 'image/png',
	pdf: 'application/pdf',
	svg: 'image/svg+xml',
	js: 'application/javascript',
};

export const getProfilePicture = catchErrors(async (req, res) => {
	const fileName = req.query.fileName;

	const filePath = `./profile-pictures/${fileName}`;
	// @ts-ignore
	let type = mime[path.extname(fileName).slice(1)] || 'image/jpeg';

	let f = fs.createReadStream(filePath);
	f.on('open', function () {
		res.set('Content-Type', type);
		f.pipe(res);
	});
	f.on('error', function () {
		res.set('Content-Type', 'text/plain');
		res.status(404).end('Not found');
	});
	console.log(filePath);
}, 'Failed to get file');

export const uploadProfilePicture = catchErrors(async (req, res) => {
	const client = await connect();
	await transaction(
		async () => {
			query(
				`
	            UPDATE users SET profile_pic = $1 WHERE username = $2
	        `,
				[],
			);
		},
		client,
		'',
	);
}, 'Failed to upload profile picture');

export const getProfileById = catchErrors(async (req, res) => {
	let userId = req.params.uid;

	let profile = await query(
		`
        SELECT u.username, u.firstname, u.lastname, u.phone,
        u.email, u.profile_pic, u.bio, u.u_id, 
        d.name AS degree, d.d_id,
        s.name AS school, s.s_id,
        l.name AS location, l.l_id
        FROM users u JOIN locations l
        ON u.location = l.l_id
        LEFT JOIN degrees d ON d.d_id = u.degree
        LEFT JOIN schools s ON s.s_id = u.school
        WHERE u.u_id = $1
    `,
		[userId],
	);

	let languages = await query(
		`
		SELECT lang.name, lang.language_id 
		FROM languages lang JOIN language_connections lc
		ON lang.language_id = lc.language_id WHERE lc.u_id = $1
	`,
		[userId],
	);

	res.json({ ...profile.rows[0], languages: languages.rows });
}, 'Failed to get profile');

export const updateProfile = catchErrors(async (req, res) => {
	const userId = req.decoded.u_id;
	const { phone, email, bio, location, school, degree } = req.body;

	const client = await connect();
	await transaction(
		async () => {
			query(
				`
	            UPDATE users SET email=$1, phone=$2, bio=$3, location=$4, school=$6, degree=$7 WHERE u_id = $5
	        `,
				[email, phone, bio, location, userId, school, degree],
			);
		},
		client,
		'Failed to update profile',
	);
	res.status(201).json({ success: true });
}, 'Failed to update profile');

export const getProfiles = catchErrors(async (req, res) => {
	let skillFilter = req.query.skillFilter || '';
	let search = req.query.search || '';

	let profiles: any;

	if (Number(skillFilter)) {
		profiles = await query(
			`
			SELECT u.u_id, u.username, u.firstname, u.lastname, u.email, u.profile_pic,
			l.name AS location, s.name AS school, d.name AS degree
			FROM users u JOIN skill_connections sc ON u.u_id = sc.u_id 
			LEFT JOIN locations l ON u.location = l.l_id
			LEFT JOIN degrees d ON u.degree = d.d_id
			LEFT JOIN schools s ON u.school = s.s_id
			WHERE sc.s_id=$1 
			AND LOWER(firstname::text || lastname::text) LIKE $2 
			ORDER BY LOWER(firstname::text || lastname::text) ASC
		`,
			[skillFilter, `%${search}%`.toLowerCase()],
		);
	} else {
		profiles = await query(
			`
			SELECT u_id, username, firstname, lastname, email, profile_pic,
			l.name AS location, s.name AS school, d.name AS degree
			FROM users u
			LEFT JOIN locations l ON u.location = l.l_id
			LEFT JOIN degrees d ON u.degree = d.d_id
			LEFT JOIN schools s ON u.school = s.s_id
			WHERE LOWER(firstname::text || lastname::text) LIKE $1 
			ORDER BY LOWER(firstname::text || lastname::text) ASC
	`,
			[`%${search}%`.toLowerCase()],
		);
	}

	res.json(profiles.rows);
}, 'Failed to get profiles');

export const createDegree = catchErrors(async (req, res) => {
	const { name } = req.body;

	await query(
		`
		INSERT INTO degrees (name)
		VALUES ($1)
	`,
		[name],
	);

	res.status(201).json({ success: true });
}, 'Failed to create degree');

export const getDegrees = catchErrors(async (req, res) => {
	let degrees = await query(`
		SELECT name, d_id FROM degrees ORDER BY name ASC
	`);

	res.json(degrees.rows);
}, 'Failed to get degrees');

export const createSchool = catchErrors(async (req, res) => {
	const { name } = req.body;

	await query(
		`
		INSERT INTO schools (name)
		VALUES ($1)
	`,
		[name],
	);

	res.status(201).json({ success: true });
}, 'Failed to create degree');

export const getSchools = catchErrors(async (req, res) => {
	let degrees = await query(`
		SELECT name, s_id FROM schools ORDER BY name ASC
	`);

	res.json(degrees.rows);
}, 'Failed to get degrees');

export const addLanguageToUser = catchErrors(async (req, res) => {
	const { userId, languageId } = req.body;

	await query(
		`
		INSERT INTO language_connections (language_id, u_id)
		VALUES ($1, $2)
	`,
		[languageId, userId],
	);
	res.json({ success: true });
}, 'Failed to add language to user');

export const createLanguage = catchErrors(async (req, res) => {
	const { name } = req.body;

	let createdLanguage = await query(
		'INSERT INTO languages (name) VALUES ($1) RETURNING language_id',
		[name],
	);

	res.status(201).json({
		name: name,
		language_id: createdLanguage.rows[0].language_id,
	});
}, 'Failed to create language');

export const getLanguages = catchErrors(async (req, res) => {
	const search = req.query.q || '';
	const filter = req.query.filter || 'none';
	const limit = req.query.limit || 20;
	const userId = req.decoded.u_id;
	let langauges: any;
	if (filter === 'none') {
		langauges = await query(
			`
       		SELECT l.name, l.language_id FROM languages l 
       		LEFT JOIN language_connections lc
       		ON lc.language_id = l.language_id WHERE LOWER(l.name) 
       		LIKE $1 OR lc.u_id IS NULL LIMIT $2 
    	`,
			[`%${search}%`, limit],
		);
	} else {
		langauges = await query(
			`
			SELECT l.name, l.language_id FROM languages l 
       		LEFT JOIN language_connections lc
       		ON lc.language_id = l.language_id 
       		WHERE LOWER(l.name) LIKE $1
       		AND (lc.u_id != $2 OR lc.u_id IS NULL) LIMIT $3
	`,
			[`%${search}%`, userId, limit],
		);
	}
	res.json(langauges.rows || []);
}, 'Failed to get languages');

export const getLocations = catchErrors(async (req, res) => {
	let locations = await query(`
		SELECT name, l_id FROM locations ORDER BY name ASC
	`);

	res.json(locations.rows);
}, 'Failed to get locations');

export const removeLanguage = catchErrors(async (req, res) => {
	const userId = req.decoded.u_id;
	const { languageId } = req.body;
	await query(
		`
		DELETE from language_connections WHERE u_id = $1 AND language_id = $2
	`,
		[userId, languageId],
	);

	res.json({ success: true });
}, 'Failed to remove language');

export const createLocation = catchErrors(async (req, res) => {
	const { name, lat, long } = req.body;
	await query(
		`
		INSERT INTO locations (name, lat, long) VALUES
		($1, $2, $3);
	`,
		[name, lat, long],
	);

	res.status(201).json({ success: true });
}, 'Failed to create location');

export const getProfileSummary = catchErrors(async (req, res) => {
	let languages = await query(`
		SELECT l.name as languages FROM languages l JOIN language_connections lc ON lc.language_id = l.language_id GROUP BY l.name 
	`);
	let education = await query(`
		SELECT d.name as degrees, s.name as schools FROM users u JOIN schools s ON u.school = s.s_id JOIN degrees d ON d.d_id = u.degree;
	`);

	res.json({
		languages: languages.rows.map((e) => e.languages),
		schools: education.rows.map((e) => e.schools),
		degrees: education.rows.map((e) => e.degrees),
	});
}, 'Failed to get summary');
