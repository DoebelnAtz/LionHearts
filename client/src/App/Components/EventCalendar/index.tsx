import React, { useState } from 'react';

import Calendar, { DateCallback } from 'react-calendar';
import './calendar.css';

type CalendarProps = {
	disabledDates?: { start: Date; end: Date; title: string }[];
	highlightedDates?: Date[];
	onDayClick?: DateCallback;
};

const EventCalendar: React.FC<CalendarProps> = ({
	disabledDates,
	highlightedDates,
	onDayClick,
}) => {
	const [selectedDay, setSelectedDay] = useState<Date>(new Date());
	console.log(new Date().toDateString());
	return (
		<Calendar
			minDetail={'month'}
			prev2Label={null}
			next2Label={null}
			prevLabel={''}
			nextLabel={''}
			onClickDay={onDayClick}
			tileClassName={({ date, view }) => {
				if (
					highlightedDates &&
					highlightedDates.find(
						(focusDate) =>
							focusDate.toDateString() === date.toDateString(),
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
