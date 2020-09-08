import React, { useRef } from 'react';

import HomePNG from '../../../../assets/images/home_img.png';
import { BGImg, ImgDiv, Vision } from './Styles';
import NavBar from '../../../NavBar';
import { url } from '../../../../config.json';

type HomeImgProps = {
	text: string;
};

const HomeImg: React.FC<HomeImgProps> = ({ text }) => {
	const fadeDiv = useRef<HTMLDivElement>(null);

	return (
		<BGImg src={`${url}/api/photos/lh_meeting.jpg`}>
			<NavBar />
			<ImgDiv ref={fadeDiv}>
				<Vision>{text}</Vision>
			</ImgDiv>
		</BGImg>
	);
};

export default HomeImg;
