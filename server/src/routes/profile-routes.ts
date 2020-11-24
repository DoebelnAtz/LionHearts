import express from 'express';
import {
	addDegreeToUser,
	addLanguageToUser,
	addSchoolToUser,
	createDegree,
	createLanguage,
	createLocation,
	createSchool,
	getDegrees,
	getLanguages,
	getLocations,
	getProfileById,
	getProfiles,
	getSchools,
	removeDegreeFromUser,
	removeLanguage,
	removeSchoolFromUser,
	updateProfile,
} from '../controllers/profile-controllers';
import { check } from 'express-validator';

const profileRouter = express.Router();

profileRouter.get('/', getProfiles);

profileRouter.get('/locations', getLocations);

profileRouter.get('/languages', getLanguages);

profileRouter.get('/degrees', getDegrees);

profileRouter.get('/schools', getSchools);

profileRouter.get('/:uid', getProfileById);

profileRouter.put(
	'/update_profile',
	[
		check('email').not().isEmpty(),
		check('phone').not().isEmpty(),
		check('location').isNumeric(),
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

profileRouter.post(
	'/add_language',
	[
		check('userId').not().isEmpty().isNumeric(),
		check('languageId').not().isEmpty().isNumeric(),
	],
	addLanguageToUser,
);

profileRouter.post(
	'/create_language',
	[check('name').not().isEmpty()],
	createLanguage,
);

profileRouter.post(
	'/create_degree',
	[check('name').not().isEmpty()],
	createDegree,
);

profileRouter.post(
	'/add_degree',
	[check('completed').isBoolean(), check('degreeId').isNumeric()],
	addDegreeToUser,
);

profileRouter.post(
	'/create_school',
	[check('name').not().isEmpty()],
	createSchool,
);

profileRouter.post(
	'/add_school',
	[check('schoolId').isNumeric()],
	addSchoolToUser,
);

profileRouter.delete(
	'/remove_language',
	[check('languageId').not().isEmpty().isNumeric()],
	removeLanguage,
);

profileRouter.delete(
	'/remove_degree',
	[check('degreeId').isNumeric()],
	removeDegreeFromUser,
);

profileRouter.delete(
	'/remove_school',
	[check('schoolId').isNumeric()],
	removeSchoolFromUser,
);

export default profileRouter;
