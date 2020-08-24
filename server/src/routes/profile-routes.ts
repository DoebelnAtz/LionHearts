import express from 'express';
import {
	getLocations,
	getProfileById,
	getProfiles,
	updateProfile,
} from '../controllers/profile-controllers';
import { check } from 'express-validator';

const profileRouter = express.Router();

profileRouter.get('/', getProfiles);

profileRouter.get('/locations', getLocations);

profileRouter.get('/:uid', getProfileById);

profileRouter.put(
	'/update_profile',
	[
		check('email').not().isEmpty(),
		check('bio').not().isEmpty(),
		check('phone').not().isEmpty(),
	],
	updateProfile,
);

export default profileRouter;
