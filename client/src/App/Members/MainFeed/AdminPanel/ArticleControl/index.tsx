import React, {
	ChangeEvent,
	useRef,
	useState,
} from 'react';
import _ from 'lodash';
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
	AddArticleInfo,
	AddArticleThumbnail,
	AddArticleAuthorTitle,
	ArticleThumbnailInput,
	ArticleOptionRow,
	ArticleEventTitle,
	AddParagraphButton,
	PreviewDiv,
	ArticleContentOptionsDiv,
} from './Styles';
import { useGet } from '../../../../../Hooks';
import {
	AuthoredArticle,
	Option,
	Profile,
} from '../../../../../@types';
import TextEditor from '../../../../Components/TextEditor';
import DropDownComponent from '../../../../Components/DropDown';
import { makeRequest } from '../../../../../Api';
import ArticleCard from './ArticleCard';
import LoadingButton from '../../../../Components/LoadingButton';
import { useSpring } from 'react-spring';
import { url } from '../../../../../config';
import QuillEditor from '../../../../Components/QuillEditor';
import Thumbnail from '../../../../Components/Thumbnail';
import { ErrorSpan } from '../FileControl/Styles';
import ToggleButton from '../../../../Components/ToggleButton';
import { AddParagraph } from './AddParagraph';
const acceptedTypes = ['image/jpeg', 'image/png'];

const ArticleControl: React.FC = () => {
	const [articles, setArticles] = useGet<
		AuthoredArticle[]
	>('/articles-no-token?events=all');
	const [adding, setAdding] = useState(true);
	const [users, setUsers] = useGet<Profile[]>(
		'/profiles',
	);
	const [text, setText] = useState<
		{ image: ''; text: '' }[]
	>([{ image: '', text: '' }]);
	const [preview, setPreview] = useState(false);
	const [errors, setErrors] = useState({
		fileError: '',
	});

	const [newArticle, setNewArticle] = useState<
		AuthoredArticle
	>({
		article: {
			article_id: 0,
			content: '',
			isevent: false,
			thumbnail: '',
			published_date: '',
			title: '',
		},
		author: {
			firstname: '',
			lastname: '',
			profile_pic: '',
			u_id: 0,
		},
	});
	const paragraphDiv = useRef<HTMLDivElement>(null);

	const handlePreviewChange = () => {
		setPreview(!preview);
	};

	const handleNewArticleContentChange = (
		newContent: string,
	) => {
		setNewArticle({
			...newArticle,
			article: {
				...newArticle.article,
				content: newContent,
			},
		});
	};
	const [selectedFile, setSelectedFile] = useState<
		File
	>();

	const expand = useSpring({
		height: adding ? '760px' : '0px',
	});

	const handleArticleCreation = async () => {
		const data = new FormData();

		try {
			if (
				!selectedFile ||
				!newArticle.article.content
			) {
			} else if (!newArticle.article.title) {
			} else if (!newArticle.author.u_id) {
			} else {
				data.append('file', selectedFile);
				await makeRequest(
					`/files/upload-file/lionhearts-images`,
					'POST',
					data,
				);
				let createdArticle = await makeRequest(
					'/articles/create_article',
					'POST',
					{
						content: text.join(''),
						author: newArticle.author.u_id,
						title: newArticle.article.title,
						thumbnail: selectedFile?.name,
						isevent: newArticle.article.isevent,
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

	const handleNewArticleUserChange = (
		newUser: Option,
	) => {
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

	const handleNewArticleTitleChange = (
		e: ChangeEvent,
	) => {
		let target = e.target as HTMLInputElement;
		setNewArticle({
			...newArticle,
			article: {
				...newArticle.article,
				title: target.value,
			},
		});
	};

	const joinParagraphs = () =>
		text.reduce((result, nextParagraph) => {
			return (
				result +
				'\n' +
				nextParagraph.image +
				nextParagraph.text
			);
		}, '');

	const renderParagraphs = () => {
		return text.map((paragraph, index) => {
			// Looks wierd, check lodash docs on flow to understand.

			const handleTextChange = (
				newText: string,
				newImage: string,
			) => {
				console.log(newText);
				setText(
					_.flow(
						(t) => {
							console.log(t);
							return t.filter(
								(p: string, i: number) =>
									i !== index,
							);
						},
						(t) => [
							...t.slice(0, index),
							{
								image: newImage,
								text: newText,
							},
							...t.slice(index),
						],
					)(text),
				);
			};
			return (
				<AddParagraph
					key={index}
					setText={handleTextChange}
					text={paragraph.text}
					image={paragraph.image}
				/>
			);
		});
	};

	const handleAddParagraphClick = () => {
		setText([...text, { image: '', text: '' }]);
		preview && setPreview(false);
		// wait until paragraph added to dom then scroll
		setTimeout(() => {
			paragraphDiv.current?.scrollIntoView({
				behavior: 'smooth',
			});
		}, 100);
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
	const sizeLimit = 100000;

	const handleFileChange = (files: FileList) => {
		let targetFile = files[0];

		if (targetFile) {
			if (targetFile.size > sizeLimit) {
				setErrors({
					...errors,
					fileError: `File size exceeds ${
						sizeLimit / 1000
					}kb`,
				});
			} else if (
				!acceptedTypes.includes(targetFile.type)
			) {
				setErrors({
					...errors,
					fileError: 'Allowed formats: jpeg, png',
				});
			} else {
				setErrors({
					...errors,
					fileError: '',
				});
				setSelectedFile(targetFile);
			}
		}
	};

	const handleEventToggle = (newState: boolean) => {
		setNewArticle({
			...newArticle,
			article: {
				...newArticle.article,
				isevent: newState,
			},
		});
	};

	return (
		<ArticleControlDiv>
			<NewArticleButton
				onClick={() => setAdding(!adding)}
			>
				New Article
			</NewArticleButton>
			<AddArticleDiv style={expand}>
				<AddArticleInfo>
					<AddArticleThumbnail>
						<Thumbnail
							url={
								selectedFile
									? URL.createObjectURL(
											selectedFile,
									  )
									: `https://storage.googleapis.com/lionhearts-images/placeholder-image.png`
							}
						/>
					</AddArticleThumbnail>
					<AddArticleTitleAuthor>
						<AddArticleTitle>
							Title
							<input
								value={
									newArticle.article.title
								}
								onChange={
									handleNewArticleTitleChange
								}
								placeholder={'title'}
							/>
						</AddArticleTitle>
						<AddArticleAuthor>
							<AddArticleAuthorTitle>
								Author
							</AddArticleAuthorTitle>
							{users && (
								<DropDownComponent
									state={
										newArticle.author
											.firstname ||
										'author'
									}
									setSelect={
										handleNewArticleUserChange
									}
									optionList={users?.map(
										(user) => {
											return {
												option:
													user.firstname,
												id:
													user.u_id,
											};
										},
									)}
									width={'152px'}
								/>
							)}
						</AddArticleAuthor>
					</AddArticleTitleAuthor>
				</AddArticleInfo>
				<ArticleOptionRow>
					<ArticleThumbnailInput
						type={'file'}
						onChange={(e: any) =>
							handleFileChange(e.target.files)
						}
					/>
					<ArticleEventTitle>
						Event:{' '}
					</ArticleEventTitle>
					<ToggleButton
						state={newArticle.article.isevent}
						setState={handleEventToggle}
					/>
				</ArticleOptionRow>
				<ErrorSpan>{errors.fileError}</ErrorSpan>
				<ArticleContentOptionsDiv>
					<AddArticleContentTitle>
						Content
					</AddArticleContentTitle>
					<ToggleButton
						state={preview}
						setState={handlePreviewChange}
					/>
				</ArticleContentOptionsDiv>
				<AddArticleContentDiv
					className={'editor-container'}
				>
					{preview ? (
						<PreviewDiv
							dangerouslySetInnerHTML={{
								__html: joinParagraphs(),
							}}
						/>
					) : (
						renderParagraphs()
					)}

					<div ref={paragraphDiv}> </div>
				</AddArticleContentDiv>
				<AddParagraphButton
					onClick={handleAddParagraphClick}
				>
					ADD PARAGRAPH
				</AddParagraphButton>
				<LoadingButton
					height={'30px'}
					onClick={handleArticleCreation}
				>
					SUBMIT
				</LoadingButton>
			</AddArticleDiv>
			<ArticleListDiv>
				{renderArticles()}
			</ArticleListDiv>
		</ArticleControlDiv>
	);
};

export default ArticleControl;
