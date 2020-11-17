import React, { ChangeEvent, useState } from 'react';
import {
	Article,
	Author,
	AuthoredArticle,
	Option,
	Profile,
} from '../../../../../../@types';
import {
	ArticleCardContents,
	ArticleCardDiv,
	ArticleCardName,
	ArticleCardTime,
	ArticleCardTitle,
} from './Styles';
import {
	AddArticleAuthor,
	AddArticleAuthorTitle,
	AddArticleContainer,
	AddArticleContentDiv,
	AddArticleContentTitle,
	AddArticleDiv,
	AddArticleInfo,
	AddArticleThumbnail,
	AddArticleTitle,
	AddArticleTitleAuthor,
	ArticleEventTitle,
	ArticleOptionRow,
	ArticleThumbnailBorder,
	ArticleThumbnailInput,
} from '../Styles';
import { makeRequest } from '../../../../../../Api';
import TextEditor from '../../../../../Components/TextEditor';
import DropDownComponent from '../../../../../Components/DropDown';
import LoadingButton from '../../../../../Components/LoadingButton';
import { useSpring } from 'react-spring';
import { url } from '../../../../../../config';
import { ApplicantName } from '../../../Applications/Styles';
import { getLocalTimeFormat } from '../../../../../../Utils';
import Thumbnail from '../../../../../Components/Thumbnail';
import ToggleButton from '../../../../../Components/ToggleButton';
import { ErrorSpan } from '../../FileControl/Styles';

type ArticleCardProps = {
	article: Article;
	author: Author;
	users: Profile[];
};

const acceptedTypes = ['image/jpeg', 'image/png'];

const ArticleCard: React.FC<ArticleCardProps> = ({
	article,
	author,
	users,
}) => {
	const [editing, setEditing] = useState(false);
	const [selectedFile, setSelectedFile] = useState<
		File
	>();

	const [editedArticle, setEditedArticle] = useState<
		AuthoredArticle
	>({
		article,
		author,
	});

	const [errors, setErrors] = useState({
		fileError: '',
	});

	const expand = useSpring({
		height: editing ? '760px' : '0px',
	});
	const sizeLimit = 500000;
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

	const handleNewArticleContentChange = (
		newContent: string,
	) => {
		setEditedArticle({
			...editedArticle,
			article: {
				...editedArticle.article,
				content: newContent,
			},
		});
	};

	const handleArticleUpdate = async () => {
		const data = new FormData();

		try {
			if (
				(!selectedFile &&
					!editedArticle.article.thumbnail) ||
				!editedArticle.article.content
			) {
			} else if (!editedArticle.article.title) {
			} else if (!editedArticle.author.u_id) {
			} else {
				if (selectedFile) {
					data.append('file', selectedFile);
					await makeRequest(
						`/files/upload-file/images/articles`,
						'POST',
						data,
					);
				}
				let createdArticle = await makeRequest(
					'/articles/update_article',
					'PUT',
					{
						content:
							editedArticle.article.content,
						author: editedArticle.author.u_id,
						title: editedArticle.article.title,
						thumbnail:
							selectedFile?.name ||
							editedArticle.article.thumbnail,
						isevent:
							editedArticle.article.isevent,
						articleId:
							editedArticle.article
								.article_id,
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
			setEditedArticle({
				...editedArticle,
				author: {
					...editedArticle.author,
					firstname: newUser.option,
					u_id: newUser.id,
				},
			});
	};

	const handleNewArticleTitleChange = (
		e: ChangeEvent,
	) => {
		let target = e.target as HTMLInputElement;
		setEditedArticle({
			...editedArticle,
			article: {
				...editedArticle.article,
				title: target.value,
			},
		});
	};

	const handleEventToggle = (event: boolean) => {
		setEditedArticle({
			...editedArticle,
			article: {
				...editedArticle.article,
				isevent: event,
			},
		});
	};

	return (
		<ArticleCardDiv key={article.article_id}>
			<ArticleCardContents
				onClick={() => setEditing(!editing)}
			>
				<ArticleCardTitle>
					{editedArticle.article.title}
				</ArticleCardTitle>
				<ArticleCardTime>
					{getLocalTimeFormat(
						editedArticle.article
							.published_date,
					)}
				</ArticleCardTime>
				<ArticleCardName>
					{editedArticle.author.firstname}
				</ArticleCardName>
			</ArticleCardContents>

			<AddArticleDiv style={expand}>
				<AddArticleContainer></AddArticleContainer>
				<AddArticleInfo>
					<AddArticleThumbnail>
						<Thumbnail
							url={
								selectedFile
									? URL.createObjectURL(
											selectedFile,
									  )
									: `${editedArticle.article.thumbnail}`
							}
						/>
					</AddArticleThumbnail>
					<AddArticleTitleAuthor>
						<AddArticleTitle>
							Title
							<input
								value={
									editedArticle.article
										.title
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
										editedArticle.author
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
									width={'100px'}
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
						state={
							editedArticle.article.isevent
						}
						setState={handleEventToggle}
					/>
				</ArticleOptionRow>
				<ErrorSpan>{errors.fileError}</ErrorSpan>

				<AddArticleContentTitle>
					Content
				</AddArticleContentTitle>
				<AddArticleContentDiv>
					<TextEditor
						editable={editing}
						state={
							editedArticle.article.content
						}
						onChange={
							handleNewArticleContentChange
						}
					/>
				</AddArticleContentDiv>
				<LoadingButton
					onClick={(e: any) =>
						handleArticleUpdate()
					}
				>
					UPDATE
				</LoadingButton>
			</AddArticleDiv>
		</ArticleCardDiv>
	);
};

export default ArticleCard;
