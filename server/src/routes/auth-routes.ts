const express = require('express');
const { check } = require('express-validator');
const authRouter = express.Router();
const authController = require('../controllers/auth-controllers');

authRouter.post(
	'/signup',
	[
		check('firstname')
			.not()
			.isEmpty(),
		check('lastname')
            .not()
            .isEmpty(),
		check('email')
            .isEmail(),
		check('password').isLength({ min: 8 }),
	],
	authController.signUp,
);

export default authRouter
