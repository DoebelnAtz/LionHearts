import styled from "styled-components";

import {color, units} from "../../Styles";


export const MemberHomeDiv = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${color.BG0};
    display: flex;
`;

export const MemberHomeMainDiv = styled.div`
    height: calc(100%);
    width: min(calc(100% - ${units.margin} * 2), 1400px);
    margin: auto;
`;

const MemberHeaderHeight = '70px';

export const MemberHeaderDiv = styled.div`
     background-color: ${color.BG0};
     height: ${MemberHeaderHeight};
`;

const MemberNavigationWidth = '220px';
const EventFeedWidth = '250px';

export const MemberNavigationDiv = styled.div`
     background-color: ${color.BG0};
    width: ${MemberNavigationWidth};
`;

export const EventFeedDiv = styled.div`
    background-color: ${color.BG0};
    width: ${EventFeedWidth};
`;

export const MemberViewDiv = styled.div`
     background-color: ${color.BG0};
    margin: 0 5px;
    width: calc(100% - ${MemberNavigationWidth} - ${units.margin} - ${EventFeedWidth});
`;


export const MemberMainDiv = styled.div`
    width: 100%;
    height: calc(100%);
    display: flex;
     background-color: ${color.BG2};
`;
