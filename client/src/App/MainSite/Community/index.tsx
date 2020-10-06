import React from 'react';
import { url } from '../../../config';
import HomeImg from '../Home/HomeImg';
import {
	CommunityContainer,
	CommunityDiv,
	LanguageIcon,
	LanguageList,
	SchoolItem,
	SummaryTitle,
} from './Styles';
import Footer from '../../Footer';
import { useGet } from '../../../Hooks';
import { Summary } from '../../../@types';

const Community: React.FC = () => {
	const [summary] = useGet<Summary>('/summary');

	const renderLanguages = () => {
		if (summary) {
			return summary.languages.map((language, index) => {
				return (
					<LanguageIcon
						key={index}
						url={`${url}/api/languages/${language}.png`}
					/>
				);
			});
		}
	};

	const renderSchools = () => {
		if (summary) {
			return summary.schools.map((school, index) => {
				return <SchoolItem key={index}>{school}</SchoolItem>;
			});
		}
	};

	return (
		<CommunityDiv>
			<HomeImg text={'COMMUNITY'} />
			<CommunityContainer>
				<p>
					The Lionhearts are a group of young, talented bright minds
					between the age of 18 to 28 looking for opportunities to
					implement their ideas and have an impact on the world that
					surrounds them.
				</p>
				<p>
					To do so, we take part in different projects supplied by
					Co-founders, where an organization (private, public, for
					profit and non-profit) asks for the help from younger people
					to reflect on an issue and sometimes ponder on a solution.
					The final outcomes vary according to the project itself,
					however, our main objective is to always support the
					organizations in their quest for a more beneficial impact on
					society. In this endeavour, we prioritize cooperating with
					other generations, in order to combine our fresh
					perspectives with their experience. Here, you will rarely
					work alone.
				</p>
				<p>
					As a result, apart from being a great opportunity to gain
					work experience and apply our skills, these projects also
					serve as unique networking platforms for all our members, as
					we get to meet some of the most renowned experts of various
					fields and collaborate with them.
				</p>
				<p>
					Our community also prioritizes its social aspect, as we
					participate in exceptional events such as soirées, parties,
					dinners, and other more casual meetings where we can get to
					know one another. We also have many opportunities to get out
					of our comfort zones by discovering new activities, such as
					sports, arts, sciences and many others upon suggestions!
					However, contributing to a better future also comes from
					personal growth. As such, thanks to our complementary
					backgrounds, we can combine a “particular set of skills” to
					achieve personal goals while sharing our passion with
					others. Together, we create a dynamic and powerful
					atmosphere where one can look as a unique platform for
					support any endeavour in their career, studies and any
					individual project. To gain insight into our present
					community:
				</p>
				<SummaryTitle>Languages spoken:</SummaryTitle>
				<LanguageList>{renderLanguages()}</LanguageList>
				<SummaryTitle>Students from:</SummaryTitle>
				{renderSchools()}
			</CommunityContainer>
			<Footer />
		</CommunityDiv>
	);
};

export default Community;
