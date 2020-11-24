import styled from 'styled-components';

import { color, cursor, font, units } from '../../../Styles';

export const MainFeedDiv = styled.div`
	width: 100%;
	height: 100%;
`;

const mainFeedHeaderHeight = '70px';

export const MainFeedHeader = styled.div`
	width: 100%;
	display: flex;
	height: ${mainFeedHeaderHeight};
	border-bottom: 10px solid ${color.BG2};
	@media (max-width: ${units.mobile}) {
		border-bottom-width: 5px;
	}
`;

export const MainFeedContent = styled.div`
	width: 100%;
	overflow: auto;
	–webkit-overflow-scrolling: touch; 
  	-webkit-transform: translate3d(0,0,0);
	height: calc(100% - 10px - ${mainFeedHeaderHeight});
	@media (max-width: ${units.mobile}) {
		height: calc(100% - 5px - ${mainFeedHeaderHeight});
	}
`;

export const MainFeedLocation = styled.span`
	${font.DCBold};
	font-size: 24px;
	line-height: 26px;
	position: relative;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	top: 0px;
	margin: auto 0 13px ${units.margin};
	color: ${color.primary};
`;

export const MainFeedLogo = styled.div`
	display: none;
	@media (max-width: ${units.mobile}) {
		display: block;
		margin: auto 0 auto ${units.margin};
	}
`;

export const UserOptionDropDown = styled.div`
	${font.DCBold};
	color: ${color.primary};
	margin: auto ${units.margin} 0 auto;
	font-size: 26px;
	position: relative;
	${cursor.clickable};
	right: 4px;
	& img {
		position: relative;
		bottom: 5px;
		left: 5px;
		height: 10px;
	}
`;

export const UserOptionsMenu = styled.div`
	position: absolute;
	background-color: ${color.BG2};
	width: 150px;
	transform: translateX(-25px);
	padding: 4px;
	font-size: 20px;
	cursor: default;
	&::after {
		content: '  ';
		position: absolute;
		top: -30%;
		left: calc(50% + 5px);
		margin-left: -6px;
		border-width: 6px;
		border-style: solid;
		border-color: transparent transparent ${color.BG2} transparent;
	}
`;

export const UserOption = styled.div`
	${cursor.clickable};
	display: flex;
	height: 24px;
	line-height: 28px;
	padding: 2px;
	&:hover {
		transition: background-color 0.1s;
		background-color: ${color.BG1};
	}
`;
