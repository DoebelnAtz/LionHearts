import React from 'react';
import NavBar from '../NavBar';

import { HomeDiv } from './Styles';
import HomeImg from './HomeImg';
import SummarySection from './SummarySection';
import EventSection from './EventSection';
import ApplyNow from './ApplyNowSection';
import Footer from '../Footer';
import NewsSection from './NewsSection';

const Home: React.FC = () => {
	return (
		<HomeDiv id={'Home'}>
			<HomeImg />
			<SummarySection />
			<EventSection />
			<ApplyNow />
			<NewsSection />
			<Footer />
		</HomeDiv>
	);
};

export default Home;
