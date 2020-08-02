import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	ApplyButton,
	ApplyNowSectionDiv,
	CallToAction,
	CallToActionDiv,
} from './Styles';

const ApplyNow: React.FC = () => {
	const history = useHistory();
	return (
		<ApplyNowSectionDiv>
			<CallToActionDiv>
				<CallToAction>
					<i>DO YOU BELIEVE YOU COULD HAVE AN IMPACT?</i>
				</CallToAction>
				<ApplyButton onClick={() => history.push('apply')}>
					BECOME A LIONHEART
				</ApplyButton>
			</CallToActionDiv>
		</ApplyNowSectionDiv>
	);
};

export default ApplyNow;
