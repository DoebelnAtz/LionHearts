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
						'Our members create a community where we can complete each other’s backgrounds and areas of expertise. With multiple perspectives, we are poised to produce sharp and wholesome insights that enable us to address complex issues beyond silos.'
					}
				/>
				<SummaryColumn
					title={'A Vision'}
					text={
							'As young people, we have the determination and audacity to improve our society. More than just an organization, Lionhearts allows us to apply our innovativeness and unique talents to fascinating projects and bring forward the changes we believe are needed! '
					}
				/>
				<SummaryColumn
					title={'A way forward'}
					text={
						'Facilitated by a strategy consultancy Co-founders, our work at Lionhearts brings together different generations. We get to collaborate with seasoned, yet forward-looking professionals from different fields to build a better tomorrow, together.'
					}
				/>
			</SummaryColumns>
		</SummarySectionDiv>
	);
};

export default SummarySection;
