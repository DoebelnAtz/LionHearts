import express from 'express';
import {
	getProfileById,
	getProfiles,
} from '../controllers/profile-controllers';

const profileRouter = express.Router();

profileRouter.get('/', getProfiles);

profileRouter.get('/:uid', getProfileById);

export default profileRouter;
