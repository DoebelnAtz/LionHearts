import React, { useRef } from 'react';

import HomePNG from '../../../assets/images/home_img.png';
import { BGImg, ImgDiv, Vision } from './Styles';
import { useScroll, useScrollPosition } from '../../../Hooks';
import NavBar from '../../NavBar';

const HomeImg = () => {
	const fadeDiv = useRef<HTMLDivElement>(null);
	//const [scrollY] = useScroll();
	useScrollPosition(({ prevPos, currPos }: any) => {
		console.log(currPos.x);
		console.log(currPos.y);
		console.log(prevPos);
	});
	return (
		<BGImg src={HomePNG}>
			<NavBar />

			<ImgDiv ref={fadeDiv}>
				<Vision>Tomorrow, built by you. </Vision>
			</ImgDiv>
		</BGImg>
	);
};

export default HomeImg;
