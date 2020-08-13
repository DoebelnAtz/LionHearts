import styled from "styled-components";

import {color, cursor, font, units} from "../../../Styles";

export const MainFeedDiv = styled.div`
    width: 100%;
    height: 100%;
`;

export const MainFeedHeader = styled.div`
    width: 100%;
    display: flex;
    height: 47px;
    border-bottom: 10px solid ${color.BG1};
`;

export const MainFeedContent = styled.div`
    width: 100%;
    height: calc(100% - 10px - 50px);
`;

export const MainFeedLocation = styled.span`
    ${font.DCBold};
    font-size: 26px;
    margin: auto 0 0 ${units.margin};
    color: ${color.primary};
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
