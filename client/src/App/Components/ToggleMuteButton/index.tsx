import React from 'react';
import muteIcon from '../../../assets/images/volume_mute.svg';
import volumeIcon from '../../../assets/images/volume.svg';
import {
	ToggleMuteButtonDiv,
	ToggleMuteIcon,
} from './Styles';
import { eventGA } from '../../../Utils/GoogleAnalytics';

type ToggleMuteButtonProps = {
	muted: boolean;
	onClick: () => void;
};

const ToggleMuteButton: React.FC<ToggleMuteButtonProps> = ({
	muted,
	onClick,
}) => {
	const handleMuteClick = () => {
		eventGA('visitor', 'video-unmute', 'video', 50);
		onClick();
	};
	return (
		<ToggleMuteButtonDiv onClick={handleMuteClick}>
			<ToggleMuteIcon
				src={muted ? muteIcon : volumeIcon}
			/>
		</ToggleMuteButtonDiv>
	);
};

export default ToggleMuteButton;
