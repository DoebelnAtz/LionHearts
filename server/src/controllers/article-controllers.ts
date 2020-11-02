import { catchErrors } from '../errors/catchErrors';
import { connect, query } from '../postgres';
import { transaction } from '../errors/transaction';

export const getArticles = catchErrors(async (req, res) => {
	const events = req.query.events || 'false';

	let articles;

	if (events === 'true') {
		articles = await query(`
        SELECT a.article_id, a.title, a.isevent, a.thumbnail, a.content, 
        a.published_date, u.u_id, u.firstname, u.lastname, u.profile_pic
        FROM articles a LEFT JOIN users u ON a.author = u.u_id WHERE a.isevent = true ORDER BY a.published_date DESC
    `);
	} else if (events === 'all') {
		articles = await query(`
        SELECT a.article_id, a.title, a.isevent, a.thumbnail, a.content, 
        a.published_date, u.u_id, u.firstname, u.lastname, u.profile_pic
        FROM articles a LEFT JOIN users u ON a.author = u.u_id ORDER BY a.published_date DESC
    `);
	} else {
		articles = await query(`
        SELECT a.article_id, a.title, a.isevent, a.thumbnail, a.content, 
        a.published_date, u.u_id, u.firstname, u.lastname, u.profile_pic
        FROM articles a LEFT JOIN users u ON a.author = u.u_id WHERE a.isevent = false ORDER BY a.published_date DESC
    `);
	}

	res.json(
		articles.rows.map((article) => {
			return {
				article: {
					article_id: article.article_id,
					thumbnail: article.thumbnail,
					title: article.title,
					isevent: article.isevent,
					published_date: article.published_date,
					content: article.content,
				},
				author: {
					firstname: article.firstname,
					lastname: article.lastname,
					profile_pic: article.profile_pic,
					u_id: article.u_id,
				},
			};
		}),
	);
}, 'Failed to get articles');

export const getArticleById = catchErrors(async (req, res) => {
	const articleId = req.params.aid;

	let article: any = await query(
		`
		SELECT a.article_id, a.title, a.isevent, a.content, a.thumbnail,
		a.published_date, u.u_id,
		u.username, u.firstname, u.lastname, u.profile_pic
		FROM articles a LEFT JOIN users u ON a.author = u.u_id
		WHERE a.article_id = $1
	`,
		[articleId],
	);
	article = article.rows[0];
	const createdArticle = {
		article: {
			article_id: article.article_id,
			thumbnail: article.thumbnail,
			title: article.title,
			isEvent: article.event,
			published_date: article.published_date,
			content: article.content,
		},
		author: {
			firstname: article.firstname,
			lastname: article.lastname,
			profile_pic: article.profile_pic,
			u_id: article.u_id,
		},
	};
	res.json(createdArticle);
}, 'Failed to get article by id');

export const CreateArticle = catchErrors(async (req, res) => {
	const { content, author, title, thumbnail, isEvent } = req.body;

	let createdArticle: any;
	const client = await connect();
	await transaction(
		async () => {
			let newArticle = await query(
				`
                INSERT INTO articles (content, author, title, thumbnail, isEvent) VALUES
                ($1, $2, $3, $4, $5) RETURNING content, author, article_id, published_date
            `,
				[content, author, title, thumbnail, isEvent],
			);
			let newAuthor = await query(
				`
			    SELECT firstname, lastname, u_id, profile_pic FROM users WHERE u_id = $1
			`,
				[author],
			);

			createdArticle = {
				article: newArticle.rows[0],
				author: newAuthor.rows[0],
			};
		},
		client,
		'Failed to create article',
	);

	res.status(201).json(createdArticle);
}, 'Failed to create article');

export const UpdateArticle = catchErrors(async (req, res) => {
	const { content, author, title, articleId, thumbnail, isevent } = req.body;
	let updatedArticle: any = {};
	const client = await connect();
	await transaction(
		async () => {
			let newArticle = await query(
				`
                UPDATE articles SET content = $1, author = $2, title = $3, thumbnail = $4, isevent = $5 WHERE article_id = $6
                RETURNING content, author, article_id, published_date
            `,
				[content, author, title, thumbnail, isevent, articleId],
			);
			let newAuthor = await query(
				`
			    SELECT firstname, lastname, u_id, profile_pic FROM users WHERE u_id = $1
			`,
				[author],
			);
			updatedArticle = {
				article: newArticle.rows[0],
				author: newAuthor.rows[0],
			};
		},
		client,
		'Failed to create article',
	);

	res.json(updatedArticle);
}, 'Failed to update article');
