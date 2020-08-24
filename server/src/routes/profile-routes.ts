import express from 'express';
import { getProfileById } from '../controllers/profile-controllers';

const profileRouter = express.Router();

profileRouter.get('/:uid', getProfileById);

export default profileRouter;
