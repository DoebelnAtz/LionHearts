import React from 'react';
import NavBar from '../NavBar';
import HomeImg from '../Home/HomeImg';
import { ApplyDiv } from './Styles';
import ApplyFormSection from './ApplyFormSection';

const Apply: React.FC = () => {
	return (
		<ApplyDiv>
			<HomeImg />
			<ApplyFormSection />
		</ApplyDiv>
	);
};

export default Apply;
