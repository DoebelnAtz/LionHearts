import { catchErrors } from '../errors/catchErrors';
import fs from 'fs';

export const getApplicationIdFiles = catchErrors(async (req, res, next) => {
	const path = `./applications/${req.params.applicationId}/`;
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
	const file = req.file; // file passed from client
	const body = req.body; // all other values passed from the client, like name, etc..
	console.log(file, body);
	res.json(file);
}, 'failed to upload file');

export const deleteApplicationFile = catchErrors(async (req, res, next) => {
	const { applicationId, fileName } = req.body;
	const path = `./applications/${applicationId}/${fileName}`;

	if (!!fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
	res.json({ success: true, message: `deleted: ${fileName}` });
}, 'Failed to delete file');
