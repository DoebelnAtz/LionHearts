import React, { useEffect, useRef, useState } from 'react';
import {
	VideoPlayer,
	VideoPlayerContainer,
	VideoPlayerControlsRow,
	VideoSectionContainer,
} from './Styles';
// @ts-ignore
import LHIntroVideo from '../../../../assets/videos/LionHearts_intro_sub.mp4';
import useVisibility from '../../../../Hooks';
import ToggleMuteButton from '../../../Components/ToggleMuteButton';

const VideoSection: React.FC = () => {
	const [isVisible, ref] = useVisibility();
	const videoRef = useRef<HTMLVideoElement>(null);
	const [muted, setMuted] = useState(true);
	useEffect(() => {
		if (isVisible && videoRef.current) {
			videoRef.current.play();
			videoRef.current.volume = 0.5;
		} else if (!isVisible && videoRef.current) {
			videoRef.current.pause();
		}
	}, [isVisible]);

	const handleMuteToggle = () => {
		setMuted(!muted);
	};

	return (
		<VideoSectionContainer>
			<VideoPlayerContainer ref={ref}>
				<VideoPlayer
					muted={muted}
					ref={videoRef}
					width={'100%'}
					controls
				>
					<source src={LHIntroVideo} />
				</VideoPlayer>
				<VideoPlayerControlsRow>
					<ToggleMuteButton
						muted={muted}
						onClick={handleMuteToggle}
					/>
				</VideoPlayerControlsRow>
			</VideoPlayerContainer>
		</VideoSectionContainer>
	);
};

export default VideoSection;
