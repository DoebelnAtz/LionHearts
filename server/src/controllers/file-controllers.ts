import { catchErrors } from '../errors/catchErrors';
import fs from 'fs';

export const getArticleImages = catchErrors(async (req, res) => {
	let fileNames = [];

	fileNames = fs.readdirSync('./images/articles');
	res.json(fileNames);
}, 'Failed to get images');
