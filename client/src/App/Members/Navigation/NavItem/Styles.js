import styled from 'styled-components';
import { font, color, cursor, units } from '../../../../Styles';
import { Link } from 'react-router-dom';

export const NavItemDiv = styled.div`
	width: fit-content;
	background-color: ${(props) =>
		props.highlighted ? color.tertiary : color.BG0};
	border-radius: 25px;
	${cursor.clickable};
	padding: 5px 5px;
	display: ${(props) => (props.tablet ? 'none' : 'flex')};
	margin: 5px ${units.margin} 5px ${units.margin};
	&:hover {
		transition: background-color 0.1s;
		background-color: ${color.tertiary};
	}
	@media (max-width: ${units.tablet}) {
		display: flex;
	}
	height: 30px;
`;

export const NavItemIcon = styled.div`
	margin: auto 0 auto 0;
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
	margin-left: 14px;
	text-decoration: none;
	@media (max-width: ${units.tablet}) {
		display: none;
	}
`;
