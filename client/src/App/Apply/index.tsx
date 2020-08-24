import React from 'react';
import NavBar from '../NavBar';
import HomeImg from '../Home/HomeImg';
import { ApplyDiv } from './Styles';
import ApplyFormSection from './ApplyFormSection';
import Footer from "../Footer";

const Apply: React.FC = () => {
	return (
		<ApplyDiv>
			<HomeImg />
			<ApplyFormSection />
			<Footer/>
		</ApplyDiv>
	);
};

export default Apply;
