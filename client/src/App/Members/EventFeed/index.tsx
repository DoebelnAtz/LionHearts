import React, { useEffect, useState } from 'react';
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
	const [highlightedEvents, setHighlightedEvents] = useState<Date[]>([]);

	const renderEvents = () => {
		return events?.map((event) => {
			return <EventCard key={event.e_id} card={event} />;
		});
	};

	const handleDateHover = (date: Date) => {
		console.log(date);
	};

	return (
		<EventFeedDiv>
			<EventTitleDiv>
				<EventTitleSpan>Events</EventTitleSpan>
			</EventTitleDiv>
			<EventCalendar
				onDayHover={handleDateHover}
				highlightedDates={
					events && events?.map((event) => new Date(event.time))
				}
			/>
			<EventList>{renderEvents()}</EventList>
		</EventFeedDiv>
	);
};

export default EventFeed;
