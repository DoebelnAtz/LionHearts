import express from 'express';
import {
	createLocation,
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

profileRouter.post(
	'/create_location',
	[
		check('name').not().isEmpty(),
		check('lat').not().isEmpty(),
		check('long').not().isEmpty(),
	],
	createLocation,
);

export default profileRouter;
