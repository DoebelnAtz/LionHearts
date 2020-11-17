import { catchErrors } from '../errors/catchErrors';
import fs from 'fs';
import { storage } from '../middleware';

// Creates a client
const s = storage();
export const getArticleImages = catchErrors(async (req, res) => {
	let fileNames: string[] = [];
	const [files] = await s.bucket('lionhearts-images').getFiles();

	console.log('Files:');
	files.forEach((file) => {
		fileNames.push(file.name);
	});

	res.json(fileNames);
}, 'Failed to get images');
