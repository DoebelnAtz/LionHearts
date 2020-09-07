import React from 'react';
import NavBar from '../../NavBar';
import HomeImg from '../Home/HomeImg';
import { ApplyDiv } from './Styles';
import Footer from '../../Footer';

const Community: React.FC = () => {
	return (
		<ApplyDiv>
			<HomeImg text={'COMMUNITY'} />

			<Footer />
		</ApplyDiv>
	);
};

export default Community;
