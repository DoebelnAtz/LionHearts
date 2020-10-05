import React from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../NavBar';
import HomeImg from '../Home/HomeImg';
import {
	NewsCardThumbnail,
	NewsCardTitle,
	NewsCardDate,
	NewsList,
	NewsDiv,
	NewsCard,
	NewsCardContentContainer,
	NewsPage,
} from './Styles';
import Footer from '../../Footer';
import { useGet } from '../../../Hooks';
import { AuthoredArticle } from '../../../@types';
import Thumbnail from '../../Components/Thumbnail';
import { url } from '../../../config.json';
import { getLocalDateFormat } from '../../../Utils';

const News: React.FC = () => {
	const [events, setEvents] = useGet<AuthoredArticle[]>('/articles-no-token');
	const history = useHistory();

	const handleCardClick = (id: number) => {
		history.push(`/news/${id}`);
	};

	const renderEvents = () => {
		if (events) {
			return events.map((event) => {
				return (
					<NewsCard
						onClick={() =>
							handleCardClick(event.article.article_id)
						}
						key={event.article.article_id}
					>
						<NewsCardThumbnail>
							<Thumbnail
								url={`${url}/api/photos/${event.article.thumbnail}`}
							/>
						</NewsCardThumbnail>
						<NewsCardContentContainer>
							<NewsCardTitle>{event.article.title}</NewsCardTitle>
							<NewsCardDate>
								{getLocalDateFormat(
									event.article.published_date,
								)}
							</NewsCardDate>
						</NewsCardContentContainer>
					</NewsCard>
				);
			});
		}
	};

	return (
		<NewsPage>
			<HomeImg text={'NEWS'} />
			<NewsDiv>
				<NewsList>{renderEvents()}</NewsList>
			</NewsDiv>
			<Footer />
		</NewsPage>
	);
};

export default News;
