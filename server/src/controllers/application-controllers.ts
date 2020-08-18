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

const fileRegX = /(?:\.([^.]+))?$/;

export const getApplicationIdFiles = catchErrors(async (req, res, next) => {
	const path = `./member-applications/${req.params.applicationId}/`;
	console.log(path);
	let files: any = [];
	if (!!fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file) => {
			console.log(file);
			files.push({ name: file });
		});
	} else {
		console.log('no files found');
	}
	res.json(files);
}, 'Failed to get application files');

export const uploadApplicationFile = catchErrors(async (req, res, next) => {
	const file = req.file;
	res.json(file);
}, 'failed to upload file');

export const getApplicationFile = catchErrors(async (req, res) => {
	const application = req.query.application;
	const file = req.query.file;

	const filePath = `./member-applications/${application}/${file}`;
	// @ts-ignore
	let type = mime[path.extname(file).slice(1)] || 'text/plain';

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

export const deleteApplicationFile = catchErrors(async (req, res, next) => {
	const { applicationId, fileName } = req.body;
	const path = `./member-applications/${applicationId}/${fileName}`;

	if (!!fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
	res.json({ success: true, message: `deleted: ${fileName}` });
}, 'Failed to delete file');

export const getApplications = catchErrors(async (req, res) => {
	let applications = await query(
		`SELECT a_id, firstname, lastname, application_status, submitted
			FROM applications
	`,
		[],
	);
	res.json(applications.rows);
}, 'Failed to get applications');

export const createApplication = catchErrors(async (req, res, next) => {
	const { applicationId, firstname, lastname, email, description } = req.body;
	console.log('application received');
	let existingApplication = await query(
		`
		SELECT * FROM applications WHERE email = $1 OR application_id = $2
	`,
		[email, applicationId],
	);
	if (existingApplication.rows.length) {
		let existingEmail = existingApplication.rows.find(
			(row) => row.email === email,
		);
		let existingId = existingApplication.rows.find(
			(row) => row.application_id === applicationId,
		);
		let errorTable = existingEmail?.email
			? existingId?.application_id
				? 'email and application_id'
				: 'email'
			: 'application_id';
		throw new CustomError(
			'Failed to create application',
			500,
			`Multiple key value on ${errorTable}: ${
				existingId?.application_id || ''
			} | ${existingEmail?.email || ''}`,
			``,
			errorTable === 'email'
				? 1
				: errorTable === 'application_id'
				? 2
				: 3,
		);
	}
	await query(
		`INSERT INTO applications 
		(application_id, firstname, lastname, email, description) 
		VALUES ($1, $2, $3, $4, $5)`,
		[applicationId, firstname, lastname, email, description],
	);

	res.status(201).json({
		success: true,
		message: `Application successfully created`,
	});
}, 'Failed to create application');
