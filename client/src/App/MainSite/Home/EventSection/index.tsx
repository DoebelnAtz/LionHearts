import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
	ArticleThumbnail,
	ArticleTitle,
	CaruselPagination,
	EventsHeaderLink,
	NewsCarusel,
	NewsHeader,
	NewsListDiv,
	NewsSectionDiv,
	NewsThumbnailList,
} from './Styles';
import { useGet, useWidth } from '../../../../Hooks';
import { Article, AuthoredArticle } from '../../../../@types';
import Thumbnail from '../../../Components/Thumbnail';
import { url } from '../../../../config';
import arrowLeft from '../../../../assets/images/arrow_left.png';

import arrowRight from '../../../../assets/images/arrow_right.png';

const NewsSection: React.FC = () => {
	const [articles, setArticles] = useGet<AuthoredArticle[]>(
		'/articles-no-token?events=true',
	);
	const history = useHistory();

	const renderArticles = () => {
		return (
			articles &&
			articles.map((article, index) => {
				return (
					<ArticleThumbnail
						onClick={() =>
							history.push(
								`/events/${article.article.article_id}`,
							)
						}
						key={article.article.article_id}
					>
						<Thumbnail
							url={`${url}/api/photos/${article.article.thumbnail}`}
						>
							<ArticleTitle>{article.article.title}</ArticleTitle>
						</Thumbnail>
					</ArticleThumbnail>
				);
			})
		);
	};

	return (
		<NewsSectionDiv>
			<NewsListDiv>
				<EventsHeaderLink to={'/events'}>
					<NewsHeader>OUR EVENTS!</NewsHeader>
				</EventsHeaderLink>
			</NewsListDiv>
			<NewsCarusel>
				<NewsThumbnailList id={'news-carusel'} className={'scrollbar'}>
					{renderArticles()}
				</NewsThumbnailList>
			</NewsCarusel>
		</NewsSectionDiv>
	);
};

export default NewsSection;
