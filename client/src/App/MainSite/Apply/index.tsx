import React from 'react';
import NavBar from '../../NavBar';
import { Switch, Route } from 'react-router-dom';
import HomeImg from '../Home/HomeImg';
import { ApplyDiv } from './Styles';
import ApplyFormSection from './ApplyFormSection';
import Footer from '../../Footer';
import SuccessPage from './SuccessPage';

const Apply: React.FC = () => {
	return (
		<ApplyDiv>
			<HomeImg text={'BECOME A LIONHEART'} />
			<ApplyFormSection />
			<Footer />
		</ApplyDiv>
	);
};

export default Apply;
