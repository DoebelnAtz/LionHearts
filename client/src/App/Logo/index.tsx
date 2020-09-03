import React from 'react';

import { useHistory } from 'react-router-dom';
import { LogoDiv, LogoHead, LogoImg } from './Styles';
import LogoBlue from '../../assets/images/logo_complete_blue.svg';
import LogoWhite from '../../assets/images/logo_complete_white.svg';
import LogoHeadBlue from '../../assets/images/logo_head_blue.svg';
import LogoHeadWhite from '../../assets/images/logo_head_white.svg';

const Logo: React.FC<{ inverse?: boolean; compact?: boolean }> = ({
	inverse = false,
	compact = false,
}) => {
	const history = useHistory();

	const handleLogoClick = () => {
		history.push('/');
	};

	return (
		<LogoDiv onClick={handleLogoClick}>
			<LogoHead
				src={inverse ? LogoHeadBlue : LogoHeadWhite}
				alt={'lionhearts'}
				compact={compact}
			/>

			<LogoImg
				src={inverse ? LogoBlue : LogoWhite}
				alt="lionhearts"
				compact={compact}
			/>
		</LogoDiv>
	);
};

export default Logo;
