import React from 'react';

import { useHistory } from 'react-router-dom';
import { LogoDiv, LogoImg } from './Styles';
import LogoBlue from '../../assets/images/logo_complete_blue.svg';
import LogoWhite from '../../assets/images/logo_complete_white.svg';

const Logo: React.FC<{ inverse?: boolean }> = ({ inverse = false }) => {
	const history = useHistory();

	const handleLogoClick = () => {
		history.push('/');
	};

	return (
		<LogoDiv onClick={handleLogoClick}>
			<LogoImg src={inverse ? LogoBlue : LogoWhite} alt="lionhearts" />
		</LogoDiv>
	);
};

export default Logo;
