import React from 'react';
import {
	VideoPlayer,
	VideoPlayerContainer,
	VideoSectionContainer,
} from './Styles';
// @ts-ignore
import LHIntroVideo from '../../../../assets/videos/LionHearts_intro_sub.mp4';
import useVisibility from '../../../../Hooks';

const VideoSection: React.FC = () => {
	const [isVisible, ref] = useVisibility();
	console.log(isVisible);
	return (
		<VideoSectionContainer ref={ref}>
			<VideoPlayerContainer>
				<VideoPlayer width={'100%'} controls>
					<source src={LHIntroVideo} />
				</VideoPlayer>
			</VideoPlayerContainer>
		</VideoSectionContainer>
	);
};

export default VideoSection;
