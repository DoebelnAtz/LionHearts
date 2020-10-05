import React from 'react';
import { SummaryColumns, SummarySectionDiv } from './Styles';
import SummaryColumn from './SummaryColumn';
import { useWidth } from '../../../../Hooks';

const SummarySection: React.FC = () => {
	const [isMobile] = useWidth();
	return (
		<SummarySectionDiv id={'section-summary'}>
			<SummaryColumns isMobile={isMobile}>
				<SummaryColumn
					title={'A community'}
					text={
						'Our members create a community where they can complete each other’s backgrounds and areas of expertise, producing sharp and wholesome insights that enable us to approach complex issues with a variety of perspectives.'
					}
				/>
				<SummaryColumn
					title={'A Network  '}
					text={
						'At Lionhearts, we aim at working hand in hand with the previous generations, where our fresh ideas and determination can ally with years of experience in a specific field to build a better tomorrow, together.'
					}
				/>
				<SummaryColumn
					title={'A vision'}
					text={
						'As young people, we have the determination and audacity to improve our society. More than just an organization, Lionhearts allows us to apply our innovation and talent to fascinating projects and bring the changes we believe are needed!'
					}
				/>
			</SummaryColumns>
		</SummarySectionDiv>
	);
};

export default SummarySection;
