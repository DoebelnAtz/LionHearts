import React from 'react';
import HomeImg from '../Home/HomeImg';
import { ApplyDiv } from './Styles';
import ApplyFormSection from './ApplyFormSection';
import Footer from '../../Footer';

const Apply: React.FC = () => {
	return (
		<ApplyDiv>
			<HomeImg
				BGsrc={'cows.jpg'}
				text={'BECOME A LIONHEART'}
			/>
			<ApplyFormSection />
			<Footer />
		</ApplyDiv>
	);
};

export default Apply;
