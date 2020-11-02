import React from 'react';
import ApplyFormSection from '../ApplyFormSection';
import HomeImg from '../../Home/HomeImg';
import { ApplyDiv } from '../Styles';
import Footer from '../../../Footer';
import {
	SuccessHeader,
	SuccessInfo,
	SuccessPageContainer,
} from './Styles';

const SuccessPage: React.FC = () => {
	console.log('success');
	return (
		<ApplyDiv>
			<HomeImg text={'BECOME A LIONHEART'} />
			<SuccessPageContainer>
				<SuccessHeader>
					Thank you for your application!
				</SuccessHeader>
				<SuccessInfo>
					We will contact you soon
				</SuccessInfo>
			</SuccessPageContainer>
			<Footer />
		</ApplyDiv>
	);
};

export default SuccessPage;
