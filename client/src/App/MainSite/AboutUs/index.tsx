import React from 'react';
import NavBar from '../../NavBar';
import HomeImg from '../Home/HomeImg';
import { ApplyDiv } from './Styles';
import Footer from '../../Footer';

const AboutUs: React.FC = () => {
	return (
		<ApplyDiv>
			<HomeImg text={'ABOUT US'} />
			<Footer />
		</ApplyDiv>
	);
};

export default AboutUs;
