const express = require('express');
const { check } = require('express-validator');
const authRouter = express.Router();
import { signup } from "../controllers/auth-controllers";

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
		check('password').isLength({ min: 7 }),
	],
	signup,
);

export default authRouter
