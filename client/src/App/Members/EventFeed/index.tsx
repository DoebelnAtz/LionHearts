import React from 'react';
import EventCalendar from "../../Components/EventCalendar";
import {EventsDiv} from "./Styles";


const EventFeed: React.FC = () => {
	return (<EventsDiv><EventCalendar/></EventsDiv>);
};

export default EventFeed;
