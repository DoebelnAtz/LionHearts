import { catchErrors } from '../errors/catchErrors';
import fs from 'fs';
import { storage } from '../middleware';
import { lookup } from 'mime-types';
import { format } from 'util';

// Creates a client
const s = storage();
export const getArticleImages = catchErrors(async (req, res) => {
	let fileNames: { link: string; name: string }[] = [];
	const [files] = await s.bucket('lionhearts-images').getFiles();

	('');
	files.forEach((file) => {
		console.log(file.metadata.mediaLink);
		fileNames.push({ link: file.metadata.mediaLink, name: file.name });
	});

	res.json(fileNames);
}, 'Failed to get images');

export const uploadApplicationFile = catchErrors(async (req, res, next) => {
	const applicationId = req.params.aid;

	const bucketName = `lionhearts-applications`;
	const bucket = storage().bucket(bucketName);
	const gcsFileName = `${req.file.originalname}`;
	const blob = bucket.file(`${applicationId}/${gcsFileName}`);
	const blobStream = blob.createWriteStream();

	blobStream.on('error', (err) => {
		console.log(err);
		next(err);
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
}, 'failed to upload file');
