import styled from "styled-components";
import {color, units, font, cursor} from "../../../../Styles";

export const MemberListDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;


export const MemberListOptions = styled.div`
    width: calc(100% - ${units.margin} * 2);
    padding: ${units.margin};
    display: flex;
    margin-bottom: 2vw;
`;

export const MemberListFilterTitle = styled.span`
    color: ${color.primary};
    font-size: 22px;
    margin-right: ${units.margin};
    ${font.DCBold};
`;

export const MemberListResultDiv = styled.div`
    display: flex;
    width: 100%;
`;

export const MemberListCard = styled.div`
    width: calc(50% - ${units.margin} * 2);
    margin: ${units.margin} auto;
    display: flex;
    flex-direction: column;
    border: 2px solid ${color.tertiary};
    ${cursor.clickable};
    &:hover {
        background-color: ${color.BG1};
        transition: background-color 0.1s;
    }
`;

export const MemberCardContent = styled.div`
    margin: 0 auto;
`;

export const MemberCardName = styled.div`
    ${font.DCBold};
    color: ${color.primary};
    text-transform: uppercase;
    font-size: 20px;
`;


export const MemberCardPic = styled.div`
    height: 6vw;
    margin: 0 auto;
    position: relative;
    top: -2vw;
    border: 2px solid ${color.BG0};
    border-radius: 3vw;
    width: 6vw;
`;


