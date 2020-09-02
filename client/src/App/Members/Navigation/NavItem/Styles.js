import styled from 'styled-components';
import { font, color, cursor, units } from '../../../../Styles';
import { Link } from 'react-router-dom';

export const NavItemDiv = styled.div`
	width: fit-content;
	background-color: ${color.BG0};
	border-radius: 25px;
	${cursor.clickable};
	margin-left: 10px;
	padding: ${units.margin} 15px;
	display: flex;
	&:hover {
		transition: background-color 0.1s;
		background-color: ${color.tertiary};
	}
	height: 30px;
`;

export const NavItemIcon = styled.div`
	margin: auto 20px auto 0;
	height: 30px;
	& img {
		height: 30px;
	}
`;

export const NavItemTitle = styled(Link)`
	${font.DCBold};
	color: ${color.primary};
	${cursor.clickable};
	text-transform: uppercase;
	font-size: 26px;
	letter-spacing: 1px;
	line-height: 37px;
	text-decoration: none;
`;
