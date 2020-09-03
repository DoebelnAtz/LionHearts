import React from 'react';
import Logo from '../../../Logo';
import { NavLogoDiv } from './Styles';
import LogoBlue from '../../../../assets/images/logo_complete_blue.svg';

const NavLogo: React.FC = () => {
	console.log('rendered');
	return (
		<NavLogoDiv id={'logo'}>
			<Logo inverse compact />
		</NavLogoDiv>
	);
};

export default NavLogo;
