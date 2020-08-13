import React, {useState} from 'react';

// @ts-ignore
import SimpleReactCalendar from 'simple-react-calendar'
import './calendar.css';
import {log} from "util";

const EventCalendar: React.FC = () => {

    const [selectedDay, setSelectedDay] = useState<Date>(new Date());

    const handleDateSelect = (item: Date) => {
        setSelectedDay(item);
    };
    return (
        <SimpleReactCalendar disabledIntervals={[{start: new Date(), end: new Date()}, {start: selectedDay, end: selectedDay}]} selected={selectedDay} onSelect={handleDateSelect} weekStartsOn={0} daysOfWeek={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} activeMonth={new Date()} />
    )
};

export default EventCalendar;