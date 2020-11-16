import React, { useEffect, useRef, useState } from 'react';
import { Blurhash } from 'react-blurhash';
import HomePNG from '../../../../assets/images/home_img.png';
import {
	BGImg,
	BHContainer,
	BHNavBarContainer,
	HomeBlurHash,
	ImgDiv,
	Vision,
} from './Styles';
import NavBar from '../../../NavBar';
import { url } from '../../../../config';
import { useSpring } from 'react-spring';

type HomeImgProps = {
	text: string;
	BGsrc?: string;
	hash?: string;
};

const HomeImg: React.FC<HomeImgProps> = ({ text, BGsrc, hash= 'iGF5,BxvITs:RiM{t7xaxt_N-;RjadIVNGs.WBa#%fn%ofNGs.xaM{RkRjj]WBM{Rkxat7RjjFoet7bHj[oLkDbbWAWVf+' }) => {
	const fadeDiv = useRef<HTMLDivElement>(null);
	const [loaded, setLoaded] = useState(true);
	const [src, setSrc] = useState(
		`${url}/api/photos/${BGsrc ? BGsrc : 'lh_meeting.jpg'}`,
	);

	useEffect(() => {
		const imageLoader = new Image();
		imageLoader.src = `${url}/api/photos/${
			BGsrc ? BGsrc : 'lh_meeting.jpg'
		}`;
		if (!imageLoader.complete) {
			setLoaded(false);
		}
		imageLoader.onload = () => {
			setLoaded(true);
			setSrc(imageLoader.src);
		};
	}, [BGsrc]);

	return (
		<HomeBlurHash id={'blurhash'}>
			<BHNavBarContainer>
				<NavBar />
			</BHNavBarContainer>

					<Vision>{text}</Vision>
			<BGImg completed={loaded} src={src}>
				<ImgDiv ref={fadeDiv}>
				</ImgDiv>
			</BGImg>
			<BHContainer>
				<Blurhash
					style={{
						position: 'relative',
						zIndex: 1,
						mixBlendMode: 'multiply',
					}}
					hash={
						hash
					}
					width={'100%'}
					height={'100%'}
				/>
			</BHContainer>
		</HomeBlurHash>
	);
};

export default HomeImg;
