import { catchErrors } from '../errors/catchErrors';
const { Storage } = require('@google-cloud/storage');
import fs from 'fs';
import { lookup } from 'mime-types';
import { connect, query } from '../postgres';
import { transaction } from '../errors/transaction';
import { storage } from '../middleware';
import CustomError from '../errors/customError';
import { format } from 'util';

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
	const fileName =
		typeof req.query.fileName === 'string'
			? req.query.fileName
			: 'placeholder.jpg';

	const bucket = storage().bucket('lionhearts-profile-pictures');

	const remoteFile = await bucket.file(fileName);
	const stream = await remoteFile.createReadStream();
	res.writeHead(200, {
		'Content-Disposition': `attachment; filename="${fileName}"`,
		'Content-Type': lookup(fileName as string) || 'image/jpeg',
	});
	stream.pipe(res);

	stream.on('error', function (err: Error) {
		console.log(err);
	});
	stream.on('data', function (data: any) {
		res.write(data);
	});
	stream.on('end', function () {
		res.end();
	});
}, 'Failed to get file');

export const uploadProfilePicture = catchErrors(async (req, res) => {
	if (!req.file) {
		throw new CustomError(
			'Failed to upload profile pic',
			500,
			'no file detected',
		);
	}
	const bucketName = `lionhearts-profile-pictures`;
	const bucket = storage().bucket(bucketName);
	const gcsFileName = `${req.file.originalname}`;
	const blob = bucket.file(gcsFileName);
	const blobStream = blob.createWriteStream();

	blobStream.on('error', (err) => {
		console.log(err);
	});

	blobStream.on('finish', () => {
		// The public URL can be used to directly access the file via HTTP.
		const publicUrl = format(
			`https://storage.googleapis.com/${bucket.name}/${blob.name}`,
		);
		console.log(publicUrl);
		res.status(200).send(publicUrl);
	});

	blobStream.end(req.file.buffer);
}, 'Failed to upload profile picture');

export const getProfileById = catchErrors(async (req, res) => {
	let userId = req.params.uid;

	let profile = await query(
		`
        SELECT u.username, u.firstname, u.lastname, u.phone,
        u.linkedin, u.instagram, u.twitter,
        u.email, u.profile_pic, u.bio, u.u_id, 
        s.name AS school, s.s_id,
        l.name AS location, l.l_id
        FROM users u JOIN locations l
        ON u.location = l.l_id
        LEFT JOIN schools s ON s.s_id = u.school
        WHERE u.u_id = $1
    `,
		[userId],
	);

	let degrees = await query(
		`
		SELECT d.name, d.d_id, dc.completed FROM degrees d JOIN degree_connections dc
		ON d.d_id = dc.d_id WHERE dc.u_id = $1
	`,
		[userId],
	);

	let schools = await query(
		`
		SELECT s.name, s.s_id FROM schools s JOIN school_connections sc
		ON s.s_id = sc.s_id WHERE sc.u_id = $1
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

	res.json({
		...profile.rows[0],
		languages: languages.rows,
		degrees: degrees.rows,
		schools: schools.rows,
	});
}, 'Failed to get profile');

export const updateProfile = catchErrors(async (req, res) => {
	const userId = req.decoded.u_id;
	const {
		phone,
		email,
		bio,
		location,
		school,
		instagram,
		twitter,
		linkedin,
	} = req.body;

	const client = await connect();
	try {
		await client.query('BEGIN');
		await query(
			`
	            UPDATE users 
	            SET email=$1, phone=$2, bio=$3, 
	            location=$4, school=$6,
	            twitter=$7, linkedin=$8, instagram=$9
	             WHERE u_id = $5
	        `,
			[
				email,
				phone,
				bio,
				location,
				userId,
				school,
				twitter,
				linkedin,
				instagram,
			],
		);
		await client.query('COMMIT');
	} catch (e) {
		await client.query('ROLLBACK');
		throw new CustomError('Failed to update profile', 500, e);
	} finally {
		client.release();
	}
	res.status(201).json({ success: true });
}, 'Failed to update profile');

export const getProfiles = catchErrors(async (req, res) => {
	let search = req.query.search || '';
	let profiles: any;

	profiles = await query(
		`
			SELECT u.u_id, username, firstname, lastname, email, profile_pic,
			skills, degrees, schools, studying, languages, l.name as location
			FROM users u
			LEFT JOIN locations l ON u.location = l.l_id
			LEFT JOIN (
				SELECT sc.u_id, ARRAY_AGG(s.title) as skills
				FROM skill_connections sc JOIN skills s 
				ON s.s_id = sc.s_id 
				GROUP BY sc.u_id) sk
				ON sk.u_id = u.u_id
			LEFT JOIN (
				SELECT lc.u_id, ARRAY_AGG(l.name) as languages
				FROM language_connections lc JOIN languages l
				ON l.language_id = lc.language_id 
				GROUP BY lc.u_id) la
				ON la.u_id = u.u_id
			LEFT JOIN (
				SELECT dc.u_id, ARRAY_AGG(d.name) as degrees
				FROM degree_connections dc JOIN degrees d
				ON d.d_id = dc.d_id
				 WHERE dc.completed = TRUE
				GROUP BY dc.u_id) de
				ON de.u_id = u.u_id 
			LEFT JOIN (
				SELECT dc.u_id, ARRAY_AGG(d.name) as studying
				FROM degree_connections dc JOIN degrees d
				ON d.d_id = dc.d_id
				 WHERE dc.completed = FALSE
				GROUP BY dc.u_id) st
				ON st.u_id = u.u_id 
			LEFT JOIN (
				SELECT sc.u_id, ARRAY_AGG(s.name) as schools
				FROM school_connections sc JOIN schools s
				ON s.s_id = sc.s_id
				GROUP BY sc.u_id) sch
				ON sch.u_id = u.u_id
			WHERE LOWER(firstname::text || lastname::text) LIKE $1 
			ORDER BY LOWER(firstname::text || lastname::text) ASC
	`,
		[`%${search}%`.toLowerCase()],
	);
	// this feels like a ridiculous way of going about this, but it works...

	profiles = profiles.rows.map((p: any) => {
		return {
			...p,
			degrees: p.degrees || [],
			schools: p.schools || [],
			studying: p.studying || [],
			skills: p.skills || [],
		};
	});

	res.json(profiles);
}, 'Failed to get profiles');

export const createDegree = catchErrors(async (req, res) => {
	const { name } = req.body;

	let createdDegree = await query(
		`
		INSERT INTO degrees (name)
		VALUES ($1) RETURNING name, d_id
	`,
		[name],
	);

	res.status(201).json(createdDegree.rows[0]);
}, 'Failed to create degree');

export const addDegreeToUser = catchErrors(async (req, res) => {
	const { degreeId, completed } = req.body;
	const userId = req.decoded.u_id;

	const client = await connect();
	try {
		await client.query('BEGIN');
		await query(
			`
			INSERT INTO degree_connections (completed, d_id, u_id)
			VALUES ($1, $2, $3);
		`,
			[completed, degreeId, userId],
		);
		await client.query('COMMIT');
	} catch (e) {
		await client.query('ROLLBACK');
		throw new CustomError('Failed to add degree to user', 500, e);
	} finally {
		client.release();
	}
	res.status(201).json({ success: true });
}, 'Failed to add degree to user');

export const removeDegreeFromUser = catchErrors(async (req, res) => {
	const { degreeId } = req.body;
	const userId = req.decoded.u_id;

	const client = await connect();
	try {
		await client.query('BEGIN');
		await query(
			`
			DELETE FROM degree_connections WHERE d_id = $1 AND u_id = $2
		`,
			[degreeId, userId],
		);
		await client.query('COMMIT');
	} catch (e) {
		await client.query('ROLLBACK');
		throw new CustomError('Failed to remove degree from user', 500, e);
	} finally {
		client.release();
	}
	res.status(200).json({ success: true });
}, 'Failed to remove degree from user');

export const getDegrees = catchErrors(async (req, res) => {
	let degrees = await query(`
		SELECT name, d_id FROM degrees ORDER BY name ASC
	`);

	res.json(degrees.rows);
}, 'Failed to get degrees');

export const createSchool = catchErrors(async (req, res) => {
	const { name } = req.body;

	let createdSchool = await query(
		`
		INSERT INTO schools (name)
		VALUES ($1) RETURNING s_id, name
	`,
		[name],
	);

	res.status(201).json(createdSchool.rows[0]);
}, 'Failed to create school');

export const addSchoolToUser = catchErrors(async (req, res) => {
	const { schoolId } = req.body;
	const userId = req.decoded.u_id;

	const client = await connect();
	try {
		await client.query('BEGIN');
		await query(
			`
			INSERT INTO school_connections (s_id, u_id)
			VALUES ($1, $2);
		`,
			[schoolId, userId],
		);
		await client.query('COMMIT');
	} catch (e) {
		await client.query('ROLLBACK');
		throw new CustomError('Failed to add school to user', 500, e);
	} finally {
		client.release();
	}
	res.status(201).json({ success: true });
}, 'Failed to add school to user');

export const removeSchoolFromUser = catchErrors(async (req, res) => {
	const { schoolId } = req.body;
	const userId = req.decoded.u_id;

	const client = await connect();
	try {
		await client.query('BEGIN');
		await query(
			`
			DELETE FROM school_connections WHERE s_id = $1 AND u_id = $2
		`,
			[schoolId, userId],
		);
		await client.query('COMMIT');
	} catch (e) {
		await client.query('ROLLBACK');
		throw new CustomError('Failed to remove school from user', 500, e);
	} finally {
		client.release();
	}
	res.status(200).json({ success: true });
}, 'Failed to remove school from user');

export const getSchools = catchErrors(async (req, res) => {
	let degrees = await query(`
		SELECT name, s_id FROM schools ORDER BY name ASC
	`);

	res.json(degrees.rows);
}, 'Failed to get schools');

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
	console.log(req.query);
	const filter = req.query.filter || 'none';
	const limit = req.query.limit || 20;
	const userId = req.decoded.u_id;
	let langauges: any;
	if (filter === 'none') {
		langauges = await query(
			`
       		SELECT l.name, l.language_id FROM languages l 
       		WHERE LOWER(l.name) 
       		LIKE $1 LIMIT $2 
    	`,
			[`%${search}%`, limit],
		);
	} else if (filter === 'available') {
		('');
		let forbidden = await query(
			`
			SELECT a.forb FROM 
			(SELECT lc.u_id, array_agg(lc.language_id) as 
			forb FROM language_connections lc
			WHERE lc.u_id = $1 GROUP BY lc.u_id) a`,
			[userId],
		);
		forbidden = forbidden.rows[0]?.forb || [0];
		console.log(forbidden);
		//issues with pg inserting array/
		langauges = await query(
			`
			SELECT l.name, l.language_id FROM languages l 
       		WHERE LOWER(l.name) LIKE $1
       		AND NOT (l.language_id = ANY (array[${forbidden}])) LIMIT $2
	`,
			[`%${search}%`, limit],
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
		SELECT l.name as languages FROM languages l 
		JOIN language_connections lc 
		ON lc.language_id = l.language_id 
		GROUP BY l.name 
	`);
	let degrees = await query(`
		SELECT d.name as degrees 
		FROM degrees d JOIN degree_connections dc 
		ON dc.d_id = d.d_id 
		GROUP BY d.name 
	`);

	let schools = await query(`
		SELECT s.name as schools 
		FROM schools s JOIN school_connections sc 
		ON sc.s_id = s.s_id 
		GROUP BY s.name 
	`);

	res.json({
		languages: languages.rows.map((e) => e.languages),
		schools: schools.rows.map((e) => e.schools),
		degrees: degrees.rows.map((e) => e.degrees),
	});
}, 'Failed to get summary');
