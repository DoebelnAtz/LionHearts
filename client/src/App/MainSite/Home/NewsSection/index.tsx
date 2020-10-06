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
import { Article, AuthoredArticle } from '../../../../@types';
import Thumbnail from '../../../Components/Thumbnail';
import { url } from '../../../../config';
import arrowLeft from '../../../../assets/images/arrow_left.png';

import arrowRight from '../../../../assets/images/arrow_right.png';
const NewsSection: React.FC = () => {
	const [articles, setArticles] = useGet<AuthoredArticle[]>(
		'/articles-no-token',
	);
	const history = useHistory();

	const [caruselIndex, setCaruselIndex] = useState(0);
	const [isMobile, width] = useWidth();
	const handleLeftPagination = () => {
		if (caruselIndex > 0) {
			setCaruselIndex(caruselIndex - 1);
		}
	};

	const determineCardsToShow = () => {
		return Math.max(3, Math.floor((width as number) / 360));
	};

	const handleRightPagination = () => {
		if (
			(articles?.length || 1) >
			(caruselIndex + 1) * determineCardsToShow()
		) {
			setCaruselIndex(caruselIndex + 1);
		}
	};
	const renderArticles = () => {
		return (
			articles &&
			articles.map((article, index) => {
				if (
					Math.floor(index / determineCardsToShow()) === caruselIndex
				) {
					return (
						<ArticleThumbnail
							onClick={() =>
								history.push(
									`/news/${article.article.article_id}`,
								)
							}
							key={article.article.article_id}
						>
							<Thumbnail
								url={`${url}/api/photos/${article.article.thumbnail}`}
							>
								<ArticleTitle>
									{article.article.title}
								</ArticleTitle>
							</Thumbnail>
						</ArticleThumbnail>
					);
				}
			})
		);
	};
	return (
		<NewsSectionDiv>
			<NewsListDiv>
				<NewsHeaderLink to={'/news'}>
					<NewsHeader>NEWS!</NewsHeader>
				</NewsHeaderLink>
			</NewsListDiv>
			<NewsCarusel>
				<CaruselPagination
					onClick={handleLeftPagination}
					show={caruselIndex > 0}
					url={caruselIndex > 0 ? arrowLeft : ''}
				/>
				<NewsThumbnailList id={'news-carusel'}>
					{renderArticles()}
				</NewsThumbnailList>
				{articles && (
					<CaruselPagination
						onClick={handleRightPagination}
						show={
							articles.length >
							(caruselIndex + 1) * determineCardsToShow()
						}
						url={
							articles.length >
							(caruselIndex + 1) * determineCardsToShow()
								? arrowRight
								: ''
						}
					/>
				)}
			</NewsCarusel>
		</NewsSectionDiv>
	);
};

export default NewsSection;
