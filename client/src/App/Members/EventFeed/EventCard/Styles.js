import styled from "styled-components";
import {color, units, font} from "../../../../Styles";

export const EventCardDiv = styled.div`
    width: calc(100% - ${units.margin} * 2);
    padding: ${units.margin};
    background-color: ${props => props.highlighted ? `${color.primary}20` : color.BG1}; 
    border-bottom: 2px solid ${color.BG2};
    &:last-child {
        border-bottom: none;
    }
`;

export const EventCardTitle = styled.span`
    ${font.RBold};
    font-size: 18px;
    color: ${color.primary};
`;

export const EventCardResponseRow = styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
    ${font.RReg};
    & div {
        margin-left: auto;
    }
`;

export const EventCardButtonGoing = styled.div`
    width: 33%;
    ${font.RReg};
    background-color: ${props => props.status === 'going' ? '#adff81' : '#7ec573'};
`;

export const EventCardButtonMaybe = styled.div`
    width: 33%;
    ${font.RReg};
    background-color: ${props => props.status === 'maybe' ? '#50ff50' : '#20ff20'};
`;

export const EventCardButtonNo = styled.div`
    width: 33%;
    ${font.RReg};
    background-color: ${props => props.status === 'rejected' ? '#50ff50' : '#20ff20'};
`;