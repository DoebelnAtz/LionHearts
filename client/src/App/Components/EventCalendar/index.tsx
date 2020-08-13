import React, { useState } from 'react';

import Calendar from 'react-calendar';
// @ts-ignore
import SimpleReactCalendar from 'simple-react-calendar';
import './calendar.css';

type CalendarProps = {
	disabledDates?: { start: Date; end: Date; title: string }[];
	highlightedDates?: Date[];
	onDayHover?: (date: Date) => any;
};

const EventCalendar: React.FC<CalendarProps> = ({
	disabledDates,
	highlightedDates,
	onDayHover,
}) => {
	const [selectedDay, setSelectedDay] = useState<Date>(new Date());

	return (
		<Calendar
			minDetail={'month'}
			prev2Label={null}
			next2Label={null}
			prevLabel={''}
			nextLabel={''}
			tileClassName={({ date, view }) => {
				if (
					highlightedDates &&
					highlightedDates.find(
						(focusDate) => focusDate.getDate() === date.getDate(),
					)
				) {
					return 'is-highlighted';
				} else {
					return null;
				}
			}}
		/>
	);
};

export default EventCalendar;
