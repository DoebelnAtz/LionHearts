const express = require('express');
const { check } = require('express-validator');
const authRouter = express.Router();
import {
	checkSignupAuth,
	login,
	refreshToken,
	signup,
} from '../controllers/auth-controllers';

authRouter.get('/signup/check_auth', checkSignupAuth);

authRouter.post(
	'/signup',
	[
		check('firstname').not().isEmpty(),
		check('lastname').not().isEmpty(),
		check('email').isEmail(),
		check('applicationId').not().isEmpty(),
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
