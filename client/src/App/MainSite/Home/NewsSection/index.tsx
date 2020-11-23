import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
	ArticleThumbnail,
	ArticleTitle,
	CaruselPagination,
	NewsCarusel,
	NewsHeader,
	NewsHeaderLink,
	NewsListDiv,
	NewsSectionDiv,
	NewsThumbnailList,
} from './Styles';
import { useGet, useWidth } from '../../../../Hooks';
import {
	Article,
	AuthoredArticle,
} from '../../../../@types';
import Thumbnail from '../../../Components/Thumbnail';
import { url } from '../../../../config';
const NewsSection: React.FC = () => {
	const [articles, setArticles] = useGet<
		AuthoredArticle[]
	>('/articles-no-token');
	const history = useHistory();

	const renderArticles = () => {
		return (
			articles &&
			articles.map((article, index) => {
				return (
					<ArticleThumbnail
						onClick={() =>
							history.push(
								`/articles/${article.article.article_id}`,
							)
						}
						key={article.article.article_id}
					>
						<Thumbnail
							url={`${article.article.thumbnail}`}
						>
							<ArticleTitle>
								{article.article.title}
							</ArticleTitle>
						</Thumbnail>
					</ArticleThumbnail>
				);
			})
		);
	};
	return (
		<NewsSectionDiv>
			<NewsListDiv>
				<NewsHeaderLink to={'/articles'}>
					<NewsHeader>ARTICLES!</NewsHeader>
				</NewsHeaderLink>
			</NewsListDiv>
			<NewsCarusel>
				<NewsThumbnailList
					className={'scrollbar'}
					id={'news-carusel'}
				>
					{renderArticles()}
				</NewsThumbnailList>
			</NewsCarusel>
		</NewsSectionDiv>
	);
};

export default NewsSection;
