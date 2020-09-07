import React from 'react';
import NavBar from '../../NavBar';
import HomeImg from '../Home/HomeImg';
import { ApplyDiv } from './Styles';
import Footer from '../../Footer';

const Events: React.FC = () => {
	return (
		<ApplyDiv>
			<HomeImg text={'EVENTS'} />
			<Footer />
		</ApplyDiv>
	);
};

export default Events;
