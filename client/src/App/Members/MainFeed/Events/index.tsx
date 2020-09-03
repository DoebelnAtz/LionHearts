import React, { useContext, useEffect, useState } from 'react';
import EventCalendar from '../../../Components/EventCalendar';
import {
	EventFeedDiv,
	EventList,
	EventListOptionDiv,
	EventTitleDiv,
	EventTitleSpan,
	FilterOptionLabel,
} from './Styles';
import { useAuth, useGet, useNav } from '../../../../Hooks';
import { MemberEvent } from '../../../../Types';
import DropDownComponent from '../../../Components/DropDown';
import EventCard from './EventCard';
import CreateEvent from './CreateEvent';
import { AuthContext } from '../../../../Context/AuthContext';

const Events: React.FC = () => {
	const [eventFilter, setEventFilter] = useState('all');
	useNav('Events');
	const [events, setEvents] = useGet<MemberEvent[]>(
		`/events?filter=${eventFilter}`,
	);
	const [highlightedEvents, setHighlightedEvents] = useState<MemberEvent[]>(
		[],
	);
	const [selectedDay, setSelectedDay] = useState<Date | null>(null);
	const { state: level, update } = useContext(AuthContext);

	const handleFilterChange = (newFilter: string) => {
		setEventFilter(newFilter);
		// switch (eventFilter) {
		// 	case 'upcoming':
		// 		events &&
		// 			setEvents(
		// 				events?.filter((e) => new Date(e.time) < new Date()),
		// 			);
		// 		break;
		// 	case 'past':
		// 		events &&
		// 			setEvents(
		// 				events?.filter((e) => new Date(e.time) > new Date()),
		// 			);
		// 		break;
		// 	default:
		// 		break;
		// }
	};

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
			<EventCalendar
				onDayClick={handleDateClick}
				selectedDay={selectedDay}
				highlightedDates={
					events && events?.map((event) => new Date(event.time))
				}
			/>
			{level > 1 && (
				<CreateEvent
					selectedDay={selectedDay}
					setEvents={setEvents}
					events={events}
				/>
			)}
			<EventListOptionDiv>
				<FilterOptionLabel>Show:</FilterOptionLabel>
				<DropDownComponent
					state={eventFilter}
					setSelect={handleFilterChange}
					optionList={['all', 'upcoming', 'past']}
					width={'80px'}
					height={'22px'}
				/>
			</EventListOptionDiv>
			<EventList id={'event-list'}>{renderEvents()}</EventList>
		</EventFeedDiv>
	);
};

export default Events;
