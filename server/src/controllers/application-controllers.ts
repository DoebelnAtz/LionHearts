import { catchErrors } from '../errors/catchErrors';
import fs from 'fs';
import path from 'path';
import { connect, query } from '../postgres';
import CustomError from '../errors/customError';
import { transaction } from '../errors/transaction';
import { storage } from '../middleware';
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

const deleteFolderRecursive = async function (applicationId: string) {
	const [files] = await storage()
		.bucket('lionhearts-applications')
		.getFiles({ prefix: `${applicationId}/` });

	files.forEach((file) => {
		file.delete().then(() => console.log(`deleted: ${file.name}`));
	});
};

export const getApplicationIdFiles = catchErrors(async (req, res, next) => {
	let fileNames: { name: string }[] = [];
	const applicationId = req.params.aid;
	const [files] = await storage()
		.bucket('lionhearts-applications')
		.getFiles({ prefix: `${applicationId}/` });

	files.forEach((file) => {
		console.log(file.name);
		console.log(file.name.split('/').pop());
		fileNames.push({ name: file.name.split('/').pop() || 'undefined' });
	});

	res.json(fileNames);
}, 'Failed to get application files');

export const getApplicationById = catchErrors(async (req, res) => {
	const aid = req.params.aid;

	let application = await query(
		`
		SELECT application_id, email, description, a_id, firstname, lastname, submitted, application_status
		FROM applications WHERE a_id = $1
	`,
		[aid],
	);

	res.json(application.rows[0]);
}, 'Failed to get application by id');

export const uploadFile = catchErrors(async (req, res, next) => {
	console.log(req.file);
	res.status(200).json({ files: req.file });
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
}, 'Failed to get file');

export const deleteApplicationFile = catchErrors(async (req, res, next) => {
	const { applicationId, fileName } = req.body;
	await storage()
		.bucket('lionhearts-applications')
		.file(`${applicationId}/${fileName}`)
		.delete();
	console.log(`delete: ${fileName}`);
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
		[applicationId, firstname.trim(), lastname.trim(), email, description],
	);

	res.status(201).json({
		success: true,
		message: `Application successfully created`,
	});
}, 'Failed to create application');

export const acceptApplicant = catchErrors(async (req, res) => {
	const applicationId = req.params.aid;
	await query(
		`
		UPDATE applications SET application_status = 'accepted' WHERE a_id = $1
	`,
		[applicationId],
	);

	res.json({ success: true });
}, 'Failed to accept applicant');

export const rejectApplicant = catchErrors(async (req, res) => {
	const { applicationId } = req.body;

	const client = await connect();
	await transaction(
		async () => {
			await query(
				`
	        	DELETE FROM applications WHERE application_id = $1    
	        `,
				[applicationId],
			);
		},
		client,
		'',
	);

	deleteFolderRecursive(applicationId);

	res.json({ success: true });
}, 'Failed to reject applicant');
