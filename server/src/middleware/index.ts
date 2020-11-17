import { ErrorRequestHandler, RequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { accessLogger, errorLogger } from '../logger';
import { ErrorReporting } from '@google-cloud/error-reporting';
const path = require('path');
import { Storage } from '@google-cloud/storage';
import { format } from 'util';
import exp from 'constants';
const jwt = require('jsonwebtoken');
const config = require('../config');
let errors: any;
if (process.env.NODE_ENV === 'produciton') {
	errors = new ErrorReporting({ reportMode: 'always' });
}

const keyFilePath = path.join(__dirname, '../../keyfile.json');

export const storage = () =>
	new Storage({
		projectId: process.env.PROJECT_ID,
		keyFilename: keyFilePath,
	});

export const sendUploadToGCS: RequestHandler = (req, res, next) => {
	if (!req.file) {
		return next();
	}
	const bucketName = `lionhearts-images`;
	const bucket = storage().bucket(bucketName);
	const gcsFileName = `${req.file.originalname}`;
	const blob = bucket.file(gcsFileName);
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
};

export const checkToken: RequestHandler = (req, res, next) => {
	let token =
		(req.headers['x-access-token'] as string) ||
		(req.headers['authorization'] as string);
	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Invalid token',
		});
	}
	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);
	}

	if (token) {
		jwt.verify(
			token,
			config.secret,
			(err: JsonWebTokenError, decoded: Decoded) => {
				if (err) {
					return res.status(401).json({
						success: false,
						message: 'Invalid token',
					});
				} else {
					req.decoded = decoded;
					next();
				}
			},
		);
	} else {
		return res.status(401).json({
			success: false,
			message: 'Invalid token',
		});
	}
};

export const logRequests: RequestHandler = (req, res, next) => {
	if (req.method === 'GET')
		accessLogger.info(
			`Method: ${req.method} | To: ${req.path} | Query: ${JSON.stringify(
				req.query,
			)}`,
		);
	else {
		accessLogger.info(
			`Method: ${req.method} | To: ${req.path} | Body: ${JSON.stringify(
				req.body,
			)}`,
		);
	}
	next();
};

export const handleError: ErrorRequestHandler = (error, req, res, next) => {
	errorLogger.error(`${error.status}: ${error.description}`);
	if (process.env.NODE_ENV === 'produciton') {
		errors.report(`${error.status}: ${error.description}`);
	}
	return res.status(error.status || 500).json({
		error: error.response,
		message: error.message,
		code: error.code || 0,
	});
};
