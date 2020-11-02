import styled from 'styled-components';
import { animated } from 'react-spring';

import {
	color,
	cursor,
	font,
	units,
} from '../../../Styles';

export const MobileNavDiv = styled(animated.div)`
	background-color: ${color.primary};
	display: flex;
	transition: height linear 1s;
	width: 100%;
	z-index: 2;
	flex-direction: column;
	flex-wrap: nowrap;
	opacity: 1;
`;

export const MobileNavLinks = styled(animated.div)`
	display: flex;
	padding-top: 60px;
	width: 100%;
	position: absolute;
	z-index: 2;
	background-color: ${color.primary}00;
	flex-direction: column;
	text-align: center;
	@media (max-width: 900px) {
		background-color: ${color.primary};
		position: fixed;
	}
`;

export const MobileLinkContainer = styled(animated.div)`
	padding: 20px 0;
	border-top: 3px solid ${color.BG0};
	display: flex;
	z-index: 2;
	flex-direction: column;
`;

export const MobileNavLink = styled(animated.span)`
	color: ${(props) =>
		props.inverse
			? `${color.primary}`
			: `${color.BG0}`};
	${font.DCBold};
	font-size: 40px;
	${cursor.clickable};
	padding: 0 1vw;
	height: 60px;
	text-transform: uppercase;
	margin: 10px auto;
	width: fit-content;
	line-height: 70px;
	& a {
		color: ${(props) =>
			props.inverse
				? `${color.primary}`
				: `${color.BG0}`};
		text-decoration: none;
		text-transform: uppercase;
	}
	& a:hover {
		background-color: ${color.BG0};
		color: ${color.primary};
	}
	&:hover {
		background-color: ${color.BG0};
		color: ${color.primary};
		& a {
			color: ${color.primary};
		}
	}
`;
