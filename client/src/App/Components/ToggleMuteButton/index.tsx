import React from 'react';
import muteIcon from '../../../assets/images/volume_mute.svg';
import volumeIcon from '../../../assets/images/volume.svg';
import {
	ToggleMuteButtonDiv,
	ToggleMuteIcon,
} from './Styles';

type ToggleMuteButtonProps = {
	muted: boolean;
	onClick: () => void;
};

const ToggleMuteButton: React.FC<ToggleMuteButtonProps> = ({
	muted,
	onClick,
}) => {
	return (
		<ToggleMuteButtonDiv onClick={onClick}>
			<ToggleMuteIcon
				src={muted ? muteIcon : volumeIcon}
			/>
		</ToggleMuteButtonDiv>
	);
};

export default ToggleMuteButton;
