import React from 'react';
import { useHistory } from 'react-router-dom';
import HomeImg from '../Home/HomeImg';
import {
	EventCardThumbnail,
	EventCardTitle,
	EventCardDate,
	EventList,
	EventsDiv,
	EventCard,
	EventCardContentContainer,
	EventsPage,
} from './Styles';
import Footer from '../../Footer';
import { useGet } from '../../../Hooks';
import { AuthoredArticle } from '../../../@types';
import Thumbnail from '../../Components/Thumbnail';
import { url } from '../../../config.json';
import { getLocalDateFormat } from '../../../Utils';

const Events: React.FC = () => {
	const [events, setEvents] = useGet<AuthoredArticle[]>(
		'/articles-no-token?events=true',
	);
	const history = useHistory();

	const handleCardClick = (id: number) => {
		history.push(`/events/${id}`);
	};
	const renderEvents = () => {
		if (events) {
			return events.map((event) => {
				return (
					<EventCard
						onClick={() =>
							handleCardClick(event.article.article_id)
						}
						key={event.article.article_id}
					>
						<EventCardThumbnail>
							<Thumbnail
								url={`${url}/api/photos/${event.article.thumbnail}`}
							/>
						</EventCardThumbnail>
						<EventCardContentContainer>
							<EventCardTitle>
								{event.article.title}
							</EventCardTitle>
							<EventCardDate>
								{getLocalDateFormat(
									event.article.published_date,
								)}
							</EventCardDate>
						</EventCardContentContainer>
					</EventCard>
				);
			});
		}
	};

	return (
		<EventsPage>
			<HomeImg text={'EVENTS'} BGsrc={'cinnamon_buns.jpg'} />
			<EventsDiv>
				<EventList>{renderEvents()}</EventList>
			</EventsDiv>
			<Footer />
		</EventsPage>
	);
};

export default Events;
