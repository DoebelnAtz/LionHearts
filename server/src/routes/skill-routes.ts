import express from 'express';
import { check } from 'express-validator';
import {
	addSkillToUser,
	createSkill,
	getSkills,
	getSkillsByUserId,
} from '../controllers/skill-controllers';

const skillRouter = express.Router();

skillRouter.get('/', getSkills);

skillRouter.get('/:uid', getSkillsByUserId);

skillRouter.post(
	'/create_skill',
	[check('title').not().isEmpty()],
	createSkill,
);

skillRouter.post(
	'/add_skill',
	[
		check('userId').not().isEmpty().isNumeric(),
		check('skillId').not().isEmpty().isNumeric(),
	],
	addSkillToUser,
);

export default skillRouter;
