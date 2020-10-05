import express from 'express';
import {
	CreateArticle,
	getArticleById,
	getArticles,
	UpdateArticle,
} from '../controllers/article-controllers';
import { check } from 'express-validator';

const articleRouter = express.Router();
const articleNoTokenRouter = express.Router();

articleNoTokenRouter.get('/', getArticles);

articleNoTokenRouter.get('/:aid', getArticleById);

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
		check('isEvent').isBoolean().not().isEmpty(),
		check('thumbnail').not().isEmpty(),
	],
	UpdateArticle,
);

export default { articleRouter, articleNoTokenRouter };
