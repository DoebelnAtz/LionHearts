import styled from 'styled-components'
import { color, components, font, cursor} from "../../../Styles";
import {animated} from 'react-spring';

export const ExpandableInputDiv = styled.div`
    display: flex;
`;

export const ExpandInput = styled(animated.input)`
	${components.input};
	border: 2px solid ${color.primary};
	background-color: ${color.BG0};
	color: ${color.primaryShade};
	border-radius: 0 4px 4px 0;
	height: 24px;
`;

export const ExpandButton = styled(animated.div)`
	background-color: ${color.primary};
	border: 1px solid ${color.primary};
	transition: border-radius 4s;
	padding: 2px 0;
	width: 34px;
	display: flex;
	color: ${color.BG0};
	height: 22px;
	line-height: 22px;
	text-align: center;
	${cursor.clickable};
	&:hover {
		border-color: ${color.primaryShade};
		background-color: ${color.primaryShade};
		transition: background-color 0.1s;
		${ExpandInput} {
			background-color: ${color.primaryShade}!important;
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