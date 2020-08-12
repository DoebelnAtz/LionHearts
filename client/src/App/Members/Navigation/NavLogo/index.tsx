import React from 'react';
import Logo from '../../../Logo';
import { NavLogoDiv } from './Styles';

const NavLogo: React.FC = () => {
	return (
		<NavLogoDiv>
			<Logo inverse />
		</NavLogoDiv>
	);
};

export default NavLogo;
