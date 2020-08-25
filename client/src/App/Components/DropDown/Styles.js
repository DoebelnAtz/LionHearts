import styled from "styled-components";


import {colorAdjust, components, cursor, font, color, units} from "../../../Styles";

export const DropDown = styled.div`
	position: relative;
	${font.DCBold};
	color: ${color.primary};
	font-size: 14px;
	background-color: ${color.tertiary};
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	&:hover {
		background-color: ${color.tertiary};
	}
`;

export const CurrentOption = styled.div`
	padding: 0 5px;
	height: ${props => props.height};
	font-size: calc(${props => props.height} - 6px);
	border: 1px solid ${color.primary};
	//border-radius: 4px 4px ${(props) => (props.expanded ? '0 0' : '4px 4px')};
	border-bottom: ${(props) => (props.expanded ? 'none' : '')};
	${cursor.clickable};
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	text-transform: uppercase;
	display: flex;
	text-align: center;
	& span {
		vertical-align: middle;
		line-height: 26px;
		margin: auto 0;
	}
	& img {
		margin: auto 0 auto auto;
		height: calc(6px + ${props => props.height} * 0.1);
	}
`;

export const DropDownList = styled.div`
	position: ${(props) => (props.modalOverflow ? 'fixed' : 'absolute')};
	//right: -1px;
	width: calc(${(props) => props.width} - 2px);
	background-color: ${color.BG0};
	z-index: 5;
	max-height: 300px;
	overflow-y: auto;
	overflow-x: hidden;
	//top: calc(${(props) => `${props.height}`} - 1px);
	//border-radius: 0 0 4px 4px;
	border: 1px solid ${color.primary};
`;

export const SearchInput = styled.input`
	${components.input};
	width: calc(100% - 16px);
	margin: 2px 2px;
	height: 28px;
`;

export const Option = styled.div`
	${font.text};
	font-size: 15px;
	letter-spacing: 0;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	height: calc(${(props) => props.height} - 1px);
	width: calc(100% - 9px);
	line-height: 25px;
	margin: 0 auto;
	text-transform: uppercase;
	padding: 0 4px;
	text-align: left;
	background-color: ${(props) =>
		props.highlighted
			? color.tertiary
			: color.BG1};
	transition: background-color 0.1s;
	${cursor.clickable};
	&:hover {
		background-color: ${color.tertiaryShade};
	}
`;