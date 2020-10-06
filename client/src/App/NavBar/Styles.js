import styled from 'styled-components';
import { animated } from 'react-spring';
import { font, color, cursor, units } from '../../Styles';
import { Link } from 'react-router-dom';

export const NavBarDiv = styled.div`
	width: 100%;
	height: 60px;
	position: relative;
	z-index: 2;
	display: flex;
	@media (max-width: 900px) {
		position: fixed;
	}
`;

export const NavBarLogoDiv = styled.div`
	margin: ${(props) => (props.isMobile ? 'auto' : 'auto 0 auto 0')};
	position: relative;
	z-index: 3;

	left: ${(props) => (props.isMobile ? '0' : 'min(10vw, 100px)')};
`;

export const NavBarLinksDiv = styled.div`
	margin: auto auto;
	position: relative;
	z-index: 3;
	display: flex;
`;

export const NavBarMemberIcon = styled.div`
	margin: ${(props) => (props.isMobile ? 'auto 0' : 'auto 0')};
	position: relative;
	${cursor.clickable};
	right: min(10vw, 100px);
	z-index: 3;
	height: 30px;
	& img {
		height: 30px;
		width: 30px;
	}
	@media (min-width: 900px) {
		padding-top: 10px;
	}
`;

export const NavBarLink = styled(Link)`
	color: ${(props) => (props.inverse ? `${color.primary}` : `${color.BG0}`)};
	${font.DCBold};
	font-size: 20px;
	z-index: 3;
	height: 22px;
	line-height: 30px;
	padding: 0 1vw 0 1vw;
	margin: 10px 1vw 0 1vw;
	${cursor.clickable};
	color: ${(props) => (props.inverse ? `${color.primary}` : `${color.BG0}`)};
	text-decoration: none;
	&:hover {
		text-decoration: none;
		background-color: ${color.BG0};
		color: ${color.primary};
	}
`;

export const MenuBtnDiv = styled.div`
	position: relative;
	margin: auto 0;
	${cursor.clickable};
	left: min(10vw, 100px);
`;
