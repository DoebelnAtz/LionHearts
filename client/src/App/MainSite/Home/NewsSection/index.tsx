import React from 'react';
import {
	ArticleThumbnail,
	CaruselPagination,
	NewsHeader,
	NewsListDiv,
	NewsSectionDiv,
	NewsThumbnailList,
} from './Styles';
import { useGet } from '../../../../Hooks';
import { Article, AuthoredArticle } from '../../../../Types';
import Thumbnail from '../../../Components/Thumbnail';
import { url } from '../../../../config.json';
import arrowRight from '../../../../assets/images/arrow_right.png';
const NewsSection: React.FC = () => {
	const [articles, setArticles] = useGet<AuthoredArticle[]>(
		'/articles-no-token',
	);
	const renderArticles = () => {
		return (
			articles &&
			articles.map((article) => {
				return (
					<ArticleThumbnail key={article.article.article_id}>
						<Thumbnail
							url={`${url}/api/photos/${article.article.thumbnail}`}
						/>
					</ArticleThumbnail>
				);
			})
		);
	};

	return (
		<NewsSectionDiv>
			<NewsListDiv>
				<NewsHeader>NEWS!</NewsHeader>
			</NewsListDiv>
			<NewsThumbnailList>
				{renderArticles()}
				<CaruselPagination url={arrowRight} />
			</NewsThumbnailList>
		</NewsSectionDiv>
	);
};

export default NewsSection;
