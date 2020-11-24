import styled from 'styled-components'
import {color, components, font, cursor, colorAdjust} from "../../../Styles";
import {animated} from 'react-spring';
import Color from "color";

export const ExpandableInputDiv = styled.div`
    display: flex;
`;

export const ExpandInput = styled(animated.input)`
	${components.input};
	border: 2px solid ${props => props.backgroundColor};
	background-color: ${color.BG0};
	color: ${color.primaryShade};
	border-radius: 0 4px 4px 0;
	height: calc(${props => props.height} - 4px);
`;

export const ExpandButton = styled(animated.div)`
	background-color: ${props => props.backgroundColor};
	border: 1px solid ${props => props.backgroundColor};
	padding: 2px 0;
	width: 34px;
	display: flex;
	color: ${color.BG0};
	height: calc(${props => props.height} - 4px - 2px);
	line-height: 22px;
	text-align: center;
	${cursor.clickable};
		transition: background-color 0.1s;
	&:hover {
		border-color: ${props => colorAdjust.darken(props.backgroundColor, 0.1)};
		background-color: ${props => colorAdjust.darken(props.backgroundColor, 0.1)};
		${ExpandInput} {
			background-color: ${props => colorAdjust.darken(props.backgroundColor, 0.1)}!important;
		}
	}
`;

export const ExpandButtonIconContainer = styled.div`
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const ExpandButtonIconDiv = styled(animated.div)`
    width: 10px;
    height: 2px;
    display: block;
    background-color: ${color.BG0};
    position: absolute;
`;