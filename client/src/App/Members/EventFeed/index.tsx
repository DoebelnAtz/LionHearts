import React from 'react';
import EventCalendar from '../../Components/EventCalendar';
import {
	EventFeedDiv,
	EventList,
	EventTitleDiv,
	EventTitleSpan,
} from './Styles';
import { useGet } from '../../../Hooks';
import { MemberEvent } from '../../../Types';
import DropDownComponent from '../../Components/DropDown';
import EventCard from './EventCard';

const EventFeed: React.FC = () => {
	const [events, setEvents] = useGet<MemberEvent[]>('/events');

	const renderEvents = () => {
		return events?.map((event) => {
			return <EventCard card={event} />;
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
