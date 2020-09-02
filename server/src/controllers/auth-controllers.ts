import { catchErrors } from '../errors/catchErrors';
import CustomError from '../errors/customError';
import { hash, compare } from 'bcryptjs';
import { query } from '../postgres';
import { connect } from '../postgres';
import { transaction } from '../errors/transaction';
import { accessLogger } from '../logger';
import { JsonWebTokenError, sign } from 'jsonwebtoken';
let config = require('../config');
let jwt = require('jsonwebtoken');

export const signup = catchErrors(async (req, res) => {
	const {
		firstname,
		lastname,
		password,
		email,
		applicationId,
		profilePic,
		phone,
	} = req.body;
	const username = (firstname + lastname.charAt(0)).toLowerCase();
	let application = await query(
		`
			SELECT application_id, 
			firstname, lastname, 
			email FROM applications 
			WHERE application_id = $1
	`,
		[applicationId],
	);

	if (!application.rows) {
		throw new CustomError(
			'Application does not exist',
			401,
			`Failed to sign up, invalid id: ${applicationId}`,
			'Unauthorized sign up attempt',
		);
	}
	let existingUser = await query(`SELECT email FROM users WHERE email = $1`, [
		email,
	]);

	if (!!existingUser.rows.length) {
		throw new CustomError(
			`User already exists`,
			401,
			`Failed to sign up: user already exists`,
			'This email has already been used.',
		);
	}
	let hashedPassword: string;
	hashedPassword = await hash(password, 10);
	const client = await connect();
	await transaction(
		async () => {
			await query(
				`
	        INSERT INTO users (firstname, lastname, password, email, username, phone, profile_pic)
	        VALUES ($1, $2, $3, $4, $5, $6, $7)
	    `,
				[
					firstname,
					lastname,
					hashedPassword,
					email,
					username,
					phone,
					`${username}/${profilePic}`,
				],
			);
		},
		client,
		'failed to create user',
	);
	res.status(201).json({ success: true });
});

export const checkSignupAuth = catchErrors(async (req, res) => {
	const applicationId = req.query.id;

	let application = await query(
		`
			SELECT application_id, 
			firstname, lastname, 
			email FROM applications 
			WHERE application_id = $1
	`,
		[applicationId],
	);

	if (!application.rows.length) {
		throw new CustomError(
			'Application does not exist',
			401,
			`Failed to sign up, invalid id: ${applicationId}`,
			'Unauthorized sign up attempt',
		);
	}
	res.json(application.rows[0]);
}, 'Failed to signup, invalid attempt');

export const login = catchErrors(async (req, res, next) => {
	const { username, password } = req.body;

	let existingUser;

	existingUser = await query(
		'SELECT username, u_id, password, role FROM users WHERE username = $1',
		[username.toLowerCase()],
	);
	existingUser = existingUser.rows[0];

	// Even though this seems like a 404 error we don't want to return information
	// on whether or not a user exists
	if (!existingUser) {
		throw new CustomError(
			`Failed to log in: invalid credentials`,
			401,
			`Failed to log in did not find user: ${username}`,
		);
	}

	let isValidPass = false;
	try {
		isValidPass = await compare(password, existingUser.password);
	} catch (e) {
		throw new CustomError(
			`Failed to log in`,
			500,
			`Bcrypt failed to compare passwords`,
		);
	}

	if (!isValidPass) {
		throw new CustomError(
			`Failed to log in: invalid credentials`,
			401,
			`Invalid credentials`,
		);
	}
	let token = sign(
		{
			username: username,
			u_id: existingUser.u_id,
			role: existingUser.role,
		},
		config.secret,
		{
			expiresIn: '24h', // expires in 24 hours
		},
	);

	let refreshToken = sign(
		{
			username: username,
			u_id: existingUser.u_id,
			role: existingUser.role,
		},
		config.refreshSecret,
		{
			expiresIn: '4d', // expires in 4 days
		},
	);
	accessLogger.info(`Logged in user: ${username}`);
	// return the JWT token for the future API calls
	res.json({
		success: true,
		message: 'Authentication successful!',
		token: token,
		refreshToken: refreshToken,
		user: {
			username: existingUser.username,
			u_id: existingUser.u_id,
			role: existingUser.role,
		},
	});
}, 'Failed to log in');

export const checkUserAuth = catchErrors(async (req, res) => {
	let { role } = req.decoded;
	let accessLevel = 0;
	switch (role) {
		case 'superuser':
			accessLevel = 4;
			break;
		case 'admin':
			accessLevel = 3;
			break;
		case 'publisher':
			accessLevel = 2;
			break;
		case 'member':
			accessLevel = 1;
			break;
		default:
			accessLevel = 0;
	}
	res.send({ role, accessLevel });
}, 'Failed to check user role');

export const refreshToken = catchErrors(async (req, res) => {
	let refreshToken = req.headers['x-refresh-token'] as string;
	console.log(refreshToken);
	if (!refreshToken) {
		throw new CustomError(
			'Failed to refresh token',
			401,
			'Failed to find refresh token header',
		);
	}

	if (refreshToken.startsWith('Bearer ')) {
		refreshToken = refreshToken.slice(7, refreshToken.length);
	}

	if (refreshToken) {
		jwt.verify(
			refreshToken,
			config.refreshSecret,
			(err: JsonWebTokenError, decoded: any) => {
				if (err) {
					throw new CustomError(
						'Failed to refresh token',
						401,
						'Failed to verify refresh token',
					);
				} else {
					let token = jwt.sign(
						{
							username: decoded.username,
							u_id: decoded.u_id,
							role: decoded.role,
						},
						config.secret,
						{
							expiresIn: '24h', // expires in 24 hours
						},
					);

					let refreshToken = jwt.sign(
						{
							username: decoded.username,
							u_id: decoded.u_id,
							role: decoded.role,
						},
						config.refreshSecret,
						{
							expiresIn: '4d', // expires in 4 days
						},
					);
					return res.json({
						token,
						refreshToken,
						user: {
							username: decoded.username,
							u_id: decoded.u_id,
							role: decoded.role,
						},
					});
				}
			},
		);
	} else {
		throw new CustomError('Failed to refresh token', 401);
	}
}, 'Failed to refresh access token');
