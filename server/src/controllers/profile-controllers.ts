import { catchErrors } from '../errors/catchErrors';
import fs from 'fs';
import http from 'http';
import url from 'url';
import path from 'path';
import { query } from '../postgres';
import CustomError from '../errors/customError';

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

export const getProfileById = catchErrors(async (req, res) => {
	let userId = req.params.uid;

	let profile = await query(
		`
        SELECT username, firstname, lastname, 
        email, profile_pic, bio, u_id FROM users WHERE u_id = $1
    `,
		[userId],
	);

	res.json(profile.rows[0]);
}, 'Failed to get profile');

export const getProfiles = catchErrors(async (req, res) => {
	let profiles = await query(`
		SELECT u_id, username, firstname, lastname, email, profile_pic
		FROM users;
	`);

	res.json(profiles.rows);
}, 'Failed to get profiles');
