import express from 'express';
import {
	CreateArticle,
	GetArticles,
	UpdateArticle,
} from '../controllers/article-controllers';
import { check } from 'express-validator';

const articleRouter = express.Router();
const articleNoTokenRouter = express.Router();

articleNoTokenRouter.get('/', GetArticles);

articleRouter.post(
	'/create_article',
	[
		check('content'),
		check('author').not().isEmpty().isNumeric(),
		check('title').not().isEmpty(),
	],
	CreateArticle,
);

articleRouter.put(
	'/update_article',
	[
		check('content'),
		check('author').not().isEmpty().isNumeric(),
		check('title').not().isEmpty(),
		check('articleId').isNumeric().not().isEmpty(),
	],
	UpdateArticle,
);

export default { articleRouter, articleNoTokenRouter };
