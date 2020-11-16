import React from 'react';
import {
	VideoPlayer,
	VideoPlayerContainer,
	VideoSectionContainer,
} from './Styles';
// @ts-ignore
import LHIntroVideo from '../../../../assets/videos/LionHearts_intro_sub.mp4';

const VideoSection: React.FC = () => {
	return (
		<VideoSectionContainer>
			<VideoPlayerContainer>
				<VideoPlayer width={'100%'} controls>
					<source src={LHIntroVideo} />
				</VideoPlayer>
			</VideoPlayerContainer>
		</VideoSectionContainer>
	);
};

export default VideoSection;
