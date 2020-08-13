import React from 'react';

// @ts-ignore
import SimpleReactCalendar from 'simple-react-calendar'

const EventCalendar: React.FC = () => {
    return (
        <SimpleReactCalendar activeMonth={new Date()} />
    )
};

export default EventCalendar;