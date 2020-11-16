import React from 'react';
import NavBar from '../../NavBar';

import { HomeDiv } from './Styles';
import HomeImg from './HomeImg';
import SummarySection from './SummarySection';
import EventSection from './EventSection';
import ApplyNow from './ApplyNowSection';
import Footer from '../../Footer';
import NewsSection from './NewsSection';
import { Route } from 'react-router-dom';
import LoginPopup from '../../LoginPopup';
import VideoSection from './VideoSection';

const Home: React.FC = () => {
	return (
		<HomeDiv id={'Home'}>
			<HomeImg
				hash={
					'iGF5,BxvITs:RiM{t7xaxt_N-;RjadIVNGs.WBa#%fn%ofNGs.xaM{RkRjj]WBM{Rkxat7RjjFoet7bHj[oLkDbbWAWVf+'
				}
				text={'TOMORROW, BUILT BY YOU.'}
			/>
			<SummarySection />
			<VideoSection />
			<EventSection />
			<ApplyNow />
			<NewsSection />
			<Footer />
		</HomeDiv>
	);
};

export default Home;
