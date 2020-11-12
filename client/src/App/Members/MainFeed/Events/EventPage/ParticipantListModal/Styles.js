import styled from "styled-components";
import {color, font, units} from "../../../../../../Styles";

export const ParticipantListContainer = styled.div`
    width: 50vw;
    height: 50vh;
    padding: ${units.margin} 0;
    overflow-y: auto;
    background-color: ${color.BG0};
    @media (max-width: ${units.mobile}) {
      width: 80vw;
    }
`;

export const ParticipantCard = styled.div`
    border-bottom: 2px solid ${color.tertiary};
    width: calc(100% - ${units.margin} * 2);
    margin: ${units.margin} auto 0 auto;
    height: 60px;
    display: flex;
`;

export const ParticipantListHeaderContainer = styled.div`
        width: calc(100% - ${units.margin} * 2);
        margin: 0 auto;

`;

export const ParticipantListHeader = styled.h2`
    font-size: 22px;
    color: ${color.secondary};
    ${font.DCBold};
`;

export const ParticipantName = styled.span`
    ${font.DCBold};
    font-size: 20px;
    color: ${color.primary};
    margin: auto auto auto ${units.margin};
`;

export const ParticipantProfilePic = styled.div`
    height: 50px;
    margin: auto;
    width: 50px;
`;

export const ParticipantProfilePicContainer = styled.div`
    width: 50px;
    display: flex;
`;

export const ParticipantInfoContainer = styled.div`
    width: calc(100% - 150px);
    display: flex;
`;

export const ParticipantActionContainer = styled.div`
    width: 100px;
`;