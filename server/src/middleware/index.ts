import {ErrorRequestHandler, RequestHandler} from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { accessLogger, errorLogger } from '../logger'
const jwt = require('jsonwebtoken');
const config = require('../config');
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
    if (req.method === "GET")
        accessLogger.info(`Method: ${req.method} | To: ${req.path} | Query: ${JSON.stringify(req.query)}`);
    else {
        accessLogger.info(`Method: ${req.method} | To: ${req.path} | Body: ${JSON.stringify(req.body)}`);
    }
    next();
};


export const handleError: ErrorRequestHandler = (error, req, res, next) => {
    errorLogger.error(
        `${error.status}: ${error.description} | code: ${error.code}`,
    );
    return res.status(error.status).json({ error: error.response });
};