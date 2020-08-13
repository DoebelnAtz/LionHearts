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
	const [highlightedEvents, setHighlightedEvents] = useState<MemberEvent[]>(
		[],
	);
	const [selectedDay, setSelectedDay] = useState<Date | null>(null);

	const renderEvents = () => {
		return events?.map((event) => {
			return (
				<EventCard
					key={event.e_id}
					highlighted={
						!!highlightedEvents.find(
							(highlighted) => highlighted.e_id === event.e_id,
						)
					}
					card={event}
				/>
			);
		});
	};

	const handleDateClick = (value: Date) => {
		events &&
			setHighlightedEvents(
				events.filter((event) => {
					return (
						new Date(event.time).toDateString() ===
						value.toDateString()
					);
				}),
			);
		setSelectedDay(value);
	};

	return (
		<EventFeedDiv>
			<EventTitleDiv>
				<EventTitleSpan>Events</EventTitleSpan>
			</EventTitleDiv>
			<EventCalendar
				onDayClick={handleDateClick}
				selectedDay={selectedDay}
				highlightedDates={
					events && events?.map((event) => new Date(event.time))
				}
			/>
			<EventList>{renderEvents()}</EventList>
		</EventFeedDiv>
	);
};

export default EventFeed;
