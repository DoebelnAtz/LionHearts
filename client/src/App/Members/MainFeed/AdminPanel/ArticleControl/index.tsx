import React, { ChangeEvent, useState } from 'react';
import {
	AddArticleAuthor,
	AddArticleContentDiv,
	AddArticleContentTitle,
	AddArticleDiv,
	AddArticleTitle,
	AddArticleTitleAuthor,
	ArticleControlDiv,
	ArticleListDiv,
	NewArticleButton,
	SubmitButton,
} from './Styles';
import { useGet } from '../../../../../Hooks';
import { AuthoredArticle, Option, Profile } from '../../../../../Types';
import TextEditor from '../../../../Components/TextEditor';
import DropDownComponent from '../../../../Components/DropDown';
import { makeRequest } from '../../../../../Api';
import ArticleCard from './ArticleCard';
import LoadingButton from '../../../../Components/LoadingButton';

const ArticleControl: React.FC = () => {
	const [articles, setArticles] = useGet<AuthoredArticle[]>(
		'/articles-no-token',
	);
	const [adding, setAdding] = useState(true);
	const [users, setUsers] = useGet<Profile[]>('/profiles');
	const [newArticle, setNewArticle] = useState<AuthoredArticle>({
		article: {
			article_id: 0,
			content: '',
			published_date: '',
			title: '',
		},
		author: { firstname: '', lastname: '', profile_pic: '', u_id: 0 },
	});

	const handleNewArticleContentChange = (newContent: string) => {
		setNewArticle({
			...newArticle,
			article: { ...newArticle.article, content: newContent },
		});
	};

	const handleArticleCreation = async () => {
		try {
			if (!newArticle.article.content) {
				console.log('content error');
			} else if (!newArticle.article.title) {
				console.log('title error');
			} else if (!newArticle.author.u_id) {
				console.log('author error');
			} else {
				let createdArticle = await makeRequest(
					'/articles/create_article',
					'POST',
					{
						content: newArticle.article.content,
						author: newArticle.author.u_id,
						title: newArticle.article.title,
					},
				);
				return true;
			}
			return false;
		} catch (e) {
			console.log(e);
			return false;
		}
	};

	const handleNewArticleUserChange = (newUser: Option) => {
		newUser.id &&
			setNewArticle({
				...newArticle,
				author: {
					...newArticle.author,
					firstname: newUser.option,
					u_id: newUser.id,
				},
			});
	};

	const handleNewArticleTitleChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		setNewArticle({
			...newArticle,
			article: {
				...newArticle.article,
				title: target.value,
			},
		});
	};

	const renderArticles = () => {
		return (
			articles &&
			users &&
			articles.map(({ article, author }) => {
				return (
					<ArticleCard
						key={article.article_id}
						article={article}
						author={author}
						users={users}
					>
						{article.title}
						{article.published_date}
						{author.firstname}
					</ArticleCard>
				);
			})
		);
	};
	return (
		<ArticleControlDiv>
			<NewArticleButton>New Article</NewArticleButton>
			<AddArticleDiv>
				<AddArticleTitleAuthor>
					<AddArticleTitle>
						Title
						<input
							value={newArticle.article.title}
							onChange={handleNewArticleTitleChange}
							placeholder={'title'}
						/>
					</AddArticleTitle>
					<AddArticleAuthor>
						<AddArticleContentTitle>Author</AddArticleContentTitle>
						{users && (
							<DropDownComponent
								state={newArticle.author.firstname || 'author'}
								setSelect={handleNewArticleUserChange}
								optionList={users?.map((user) => {
									return {
										option: user.firstname,
										id: user.u_id,
									};
								})}
								width={'100px'}
								height={'24px'}
							/>
						)}
					</AddArticleAuthor>
				</AddArticleTitleAuthor>
				<AddArticleContentDiv>
					<AddArticleContentTitle>Content</AddArticleContentTitle>
					<TextEditor
						editable={adding}
						state={newArticle.article.content}
						onChange={handleNewArticleContentChange}
					/>
				</AddArticleContentDiv>
				<LoadingButton onClick={handleArticleCreation}>
					SUBMIT
				</LoadingButton>
			</AddArticleDiv>
			<ArticleListDiv>{renderArticles()}</ArticleListDiv>
		</ArticleControlDiv>
	);
};

export default ArticleControl;
