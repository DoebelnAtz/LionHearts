import React from 'react';
import NavBar from '../../NavBar';
import HomeImg from '../Home/HomeImg';
import { ApplyDiv } from './Styles';
import Footer from '../../Footer';

const News: React.FC = () => {
	return (
		<ApplyDiv>
			<HomeImg text={'NEWS'} />
			<Footer />
		</ApplyDiv>
	);
};

export default News;
