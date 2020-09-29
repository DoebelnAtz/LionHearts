import { catchErrors } from '../errors/catchErrors';
import { connect, query } from '../postgres';
import { transaction } from '../errors/transaction';

export const GetArticles = catchErrors(async (req, res) => {
	let articles = await query(`
        SELECT a.article_id, a.title, a.event, a.thumbnail, a.content, a.published_date, u.u_id, u.firstname, u.lastname, u.profile_pic
        FROM articles a JOIN users u ON a.author = u.u_id
    `);

	res.json(
		articles.rows.map((article) => {
			return {
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
		}),
	);
}, 'Failed to get articles');

export const CreateArticle = catchErrors(async (req, res) => {
	const { content, author, title, thumbnail } = req.body;

	let createdArticle: any;
	const client = await connect();
	await transaction(
		async () => {
			let newArticle = await query(
				`
                INSERT INTO articles (content, author, title, thumbnail) VALUES
                ($1, $2, $3) RETURNING content, author, article_id, published_date
            `,
				[content, author, title, thumbnail],
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
	const { content, author, title, articleId, thumbnail } = req.body;
	let updatedArticle: any = {};
	const client = await connect();
	await transaction(
		async () => {
			let newArticle = await query(
				`
                UPDATE articles SET content = $1, author = $2, title = $3, thumbnail = $4 WHERE article_id = $5
                RETURNING content, author, article_id, published_date
            `,
				[content, author, title, thumbnail, articleId],
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
