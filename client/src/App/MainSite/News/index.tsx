import React from 'react';
import NavBar from '../../NavBar';
import HomeImg from '../Home/HomeImg';
import { NewsDiv } from './Styles';
import Footer from '../../Footer';

const News: React.FC = () => {
	return (
		<NewsDiv>
			<HomeImg text={'NEWS'} />
			<Footer />
		</NewsDiv>
	);
};

export default News;
