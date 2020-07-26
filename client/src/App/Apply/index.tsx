import React from 'react';
import NavBar from '../NavBar';
import HomeImg from '../Home/HomeImg';
import { ApplyDiv } from './Styles';

const Apply: React.FC = () => {
	return (
		<ApplyDiv>
			<NavBar />
			<HomeImg />
		</ApplyDiv>
	);
};

export default Apply;
