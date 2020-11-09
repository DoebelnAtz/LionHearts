import styled from 'styled-components';
import {
	font,
	color,
	cursor,
	units,
} from '../../../../../Styles';
import { Link } from 'react-router-dom';

export const NavItemDiv = styled.div`
	width: fit-content;
	background-color: ${color.BG0};
	${cursor.clickable};
	padding: 5px 5px;
	display: flex;
	margin: 5px auto;
	transition: all 0.1s;
	border-bottom: 5px solid
		${(props) =>
			props.highlighted
				? color.secondary
				: color.BG0};
	&:hover {
		height: 35px;
		border-bottom: 5px solid ${color.secondary};
	}
	height: 35px;
`;

export const NavItemIcon = styled.div`
	margin: auto 0 auto 0;
	height: 40px;
	& img {
		height: 40px;
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
	margin-left: 14px;
	text-decoration: none;
	@media (max-width: ${units.tablet}) {
		display: none;
	}
`;
