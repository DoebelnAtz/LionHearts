const express = require('express');
const { check } = require('express-validator');
const authRouter = express.Router();
import { login, refreshToken, signup } from '../controllers/auth-controllers';

authRouter.post(
	'/signup',
	[
		check('firstname').not().isEmpty(),
		check('lastname').not().isEmpty(),
		check('email').isEmail(),
		check('password').isLength({ min: 7 }),
	],
	signup,
);

authRouter.post(
	'/login',
	[check('username').not().isEmpty(), check('password').not().isEmpty()],
	login,
);

authRouter.use('/refresh_token', refreshToken);

export default authRouter;
