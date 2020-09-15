import React from 'react';
import NavBar from '../../NavBar';
import HomeImg from '../Home/HomeImg';
import { EventsDiv } from './Styles';
import Footer from '../../Footer';

const Events: React.FC = () => {
	return (
		<EventsDiv>
			<HomeImg text={'EVENTS'} />
			<EventsDiv></EventsDiv>
			<Footer />
		</EventsDiv>
	);
};

export default Events;
