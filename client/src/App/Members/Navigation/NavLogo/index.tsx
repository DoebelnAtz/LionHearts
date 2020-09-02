import React from 'react';
import Logo from '../../../Logo';
import { NavLogoDiv } from './Styles';
import LogoBlue from '../../../../assets/images/logo_complete_blue.svg';
const NavLogo: React.FC = () => {
	return (
		<NavLogoDiv>
			<Logo inverse />
		</NavLogoDiv>
	);
};

export default NavLogo;
