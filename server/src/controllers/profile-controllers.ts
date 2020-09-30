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
        u.email, u.profile_pic, u.bio, u.u_id, l.name AS location, l.l_id 
        FROM users u JOIN locations l
        ON u.location = l.l_id
 	
        WHERE u_id = $1
    `,
		[userId],
	);

	res.json(profile.rows[0]);
}, 'Failed to get profile');

export const updateProfile = catchErrors(async (req, res) => {
	const userId = req.decoded.u_id;
	const { phone, email, bio, location } = req.body;

	const client = await connect();
	await transaction(
		async () => {
			query(
				`
	            UPDATE users SET email=$1, phone=$2, bio=$3, location=$4 WHERE u_id = $5
	        `,
				[email, phone, bio, location, userId],
			);
		},
		client,
		'Failed to update profile',
	);
	res.status(201).json({ success: true });
}, 'Failed to update profile');

export const getProfiles = catchErrors(async (req, res) => {
	let skillFilter = req.query.skillFilter;
	let search = req.query.search;

	let profiles: any;

	if (Number(skillFilter)) {
		profiles = await query(
			`
			SELECT u.u_id, u.username, u.firstname, u.lastname, u.email, u.profile_pic
			FROM users u JOIN skill_connections sc ON u.u_id = sc.u_id 
			WHERE sc.s_id=$1 AND LOWER(firstname::text || lastname::text) LIKE $2 
		`,
			[skillFilter, `%${search}%`.toLowerCase()],
		);
	} else {
		profiles = await query(
			`
			SELECT u_id, username, firstname, lastname, email, profile_pic
			FROM users WHERE LOWER(firstname::text || lastname::text) LIKE $1
	`,
			[`%${search}%`.toLowerCase()],
		);
	}

	res.json(profiles.rows);
}, 'Failed to get profiles');

export const getLocations = catchErrors(async (req, res) => {
	let locations = await query(`
		SELECT name, l_id FROM locations
	`);

	res.json(locations.rows);
}, 'Failed to get locations');

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
