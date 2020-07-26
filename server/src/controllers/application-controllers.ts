import { catchErrors } from '../errors/catchErrors';
import fs from 'fs';
import CustomError from '../errors/customError';

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
