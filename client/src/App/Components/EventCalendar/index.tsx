import React, { useState } from 'react';

import Calendar, { DateCallback } from 'react-calendar';
import './calendar.css';

type CalendarProps = {
	selectedDay: Date | null;
	highlightedDates?: Date[];
	onDayClick?: DateCallback;
};

const EventCalendar: React.FC<CalendarProps> = ({
	highlightedDates,
	onDayClick,
	selectedDay,
}) => {
	return (
		<Calendar
			minDetail={'month'}
			prev2Label={null}
			next2Label={null}
			prevLabel={''}
			nextLabel={''}
			onClickDay={onDayClick}
			tileClassName={({ date, view }) => {
				let returnClass = null;
				if (
					highlightedDates &&
					highlightedDates.find(
						(focusDate) =>
							focusDate.toDateString() === date.toDateString(),
					)
				) {
					returnClass = 'is-highlighted';
				}
				if (selectedDay?.toDateString() === date.toDateString()) {
					returnClass = returnClass + ' is-selected';
				}
				return returnClass;
			}}
		/>
	);
};

export default EventCalendar;
