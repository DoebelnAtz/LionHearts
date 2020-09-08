import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
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
import { useSpring } from 'react-spring';
import { url } from '../../../../../config.json';

const ArticleControl: React.FC = () => {
	const [articles, setArticles] = useGet<AuthoredArticle[]>(
		'/articles-no-token',
	);
	const [adding, setAdding] = useState(true);
	const [users, setUsers] = useGet<Profile[]>('/profiles');
	const editor = useRef(null);

	const imageHandler = (image: any, callback: any) => {
		// @ts-ignore
		var range = editor.current.getEditor().getSelection();
		var value = prompt('What is the image URL');
		if (value) {
			// @ts-ignore
			editor.current
				.getEditor()
				.insertEmbed(range.index, 'image', value, 'user');
		}
	};
	let modules: any = {
		toolbar: {
			container: [
				[{ header: '1' }, { header: '2' }, { font: [] }],
				[{ size: [] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[
					{ list: 'ordered' },
					{ list: 'bullet' },
					{ indent: '-1' },
					{ indent: '+1' },
				],
				['link', 'image', 'video'],
				['clean'],
			],
			handlers: {
				image: imageHandler,
			},
		},
	};
	useEffect(() => {
		modules = {
			toolbar: {
				container: [
					[{ header: '1' }, { header: '2' }, { font: [] }],
					[{ size: [] }],
					['bold', 'italic', 'underline', 'strike', 'blockquote'],
					[
						{ list: 'ordered' },
						{ list: 'bullet' },
						{ indent: '-1' },
						{ indent: '+1' },
					],
					['link', 'image', 'video'],
					['clean'],
				],
				handlers: {
					image: imageHandler,
				},
			},
			clipboard: {
				// toggle to add extra line breaks when pasting HTML:
				matchVisual: false,
			},
		};
	}, [editor.current]);
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
		console.log(newContent);
		setNewArticle({
			...newArticle,
			article: { ...newArticle.article, content: newContent },
		});
	};

	const expand = useSpring({
		height: adding ? '560px' : '0px',
		margin: adding ? '10px 10px' : '0px 10px',
	});

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
			<NewArticleButton onClick={() => setAdding(!adding)}>
				New Article
			</NewArticleButton>
			<AddArticleDiv style={expand}>
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
				<AddArticleContentTitle>Content</AddArticleContentTitle>
				<AddArticleContentDiv className={'editor-container'}>
					<ReactQuill
						value={newArticle.article.content}
						onChange={handleNewArticleContentChange}
						theme={'snow'}
						modules={modules}
						ref={editor}
						bounds={'.editor-container'}
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
