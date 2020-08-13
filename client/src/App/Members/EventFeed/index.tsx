import React from 'react';
import EventCalendar from '../../Components/EventCalendar';
import {
	EventCard,
	EventCardTitle,
	EventFeedDiv,
	EventList,
	EventTitleDiv,
	EventTitleSpan,
} from './Styles';
import { useGet } from '../../../Hooks';
import { MemberEvent } from '../../../Types';

const EventFeed: React.FC = () => {
	const [events, setEvents] = useGet<MemberEvent[]>('/events');

	const renderEvents = () => {
		return events?.map((event) => {
			return (
				<EventCard>
					<EventCardTitle>{event.title}</EventCardTitle>
				</EventCard>
			);
		});
	};
	return (
		<EventFeedDiv>
			<EventTitleDiv>
				<EventTitleSpan>Events</EventTitleSpan>
			</EventTitleDiv>
			<EventCalendar />
			<EventList>{renderEvents()}</EventList>
		</EventFeedDiv>
	);
};

export default EventFeed;
