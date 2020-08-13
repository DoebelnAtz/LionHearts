import styled from "styled-components";


import {colorAdjust, components, cursor, font, color, units} from "../../../Styles";

export const DropDown = styled.div`
	position: relative;
	${font.text};
	font-size: 14px;
	background-color: ${color.BG2};
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	&:hover {
		background-color: ${colorAdjust.darken(color.BG2, 0.1)};
	}
`;

export const CurrentOption = styled.div`
	padding: 0 5px;
	height: ${props => props.height};
	font-size: calc(${props => props.height} - 4px);
	line-height: calc(${props => props.height} + 2px);
	border: 1px solid ${color.primary};
	border-radius: 4px 4px ${(props) => (props.expanded ? '0 0' : '4px 4px')};
	border-bottom: ${(props) => (props.expanded ? 'none' : '')};
	${cursor.clickable};
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	vertical-align: middle;
	display: flex;
	text-align: center;
	& span {
		margin: 0 auto;
	}
	& img {
		margin: auto 0;
		height: calc(${props => props.height} - 14px);
	}
`;

export const DropDownList = styled.div`
	position: ${(props) => (props.modalOverflow ? 'fixed' : 'absolute')};
	//right: -1px;
	width: calc(${(props) => props.width} - 6px);
	background-color: ${color.BG2};
	z-index: 5;
	padding: 2px;
	max-height: 300px;
	overflow-y: auto;
	overflow-x: hidden;
	//top: calc(${(props) => `${props.height}`} - 1px);
	border-radius: 0 0 4px 4px;
	border: 1px solid ${color.primary};
	border-top: none;
`;

export const SearchInput = styled.input`
	${components.input};
	width: calc(100% - 16px);
	margin: 2px 2px;
	height: 28px;
`;

export const Option = styled.div`
	text-align: center;
	${font.text};
	font-size: 15px;
	letter-spacing: 0;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	height: ${(props) => props.height};
	width: calc(100% - 16px);
	line-height: ${(props) => props.height};
	margin: 2px;
	padding: 0 6px;
	background-color: ${(props) =>
		props.highlighted
			? colorAdjust.darken(color.BG1, 0.15)
			: colorAdjust.darken(color.BG2, 0.2)};
	border-radius: 4px;
	transition: background-color 0.1s;
	${cursor.clickable};
	&:hover {
		background-color: ${colorAdjust.darken(color.BG1, 0.11)};
	}
`;