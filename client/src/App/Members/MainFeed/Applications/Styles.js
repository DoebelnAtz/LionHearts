import styled from "styled-components";
import {color, colorAdjust, cursor, font, units} from "../../../../Styles";

export const ApplicationDiv = styled.div`
    width: calc(100% - ${units.margin} * 2);
    border-bottom: 2px solid ${color.BG1};
    padding: ${units.margin};
    height: 50px;
    display: flex;
    ${cursor.clickable};
    &:hover {
        transition: background-color 0.1s;
        background-color: ${colorAdjust.darken('#ffffff', 0.05)};
    }
`;

export const ApplicationInfoLabel = styled.span`
    ${font.RReg};
`;

export const ApplicationInfoName = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ApplicationInfoSubmitted = styled.div`
    display: flex;
    margin: 0 auto;
    flex-direction: column;
`;

export const ApplicationInfoStatus = styled.div`
    display: flex;
    margin-left: auto;
    flex-direction: column;
`;

export const ApplicantName = styled.span`
    ${font.text};
    margin-top: auto;
`;

export const ApplicantStatus = styled.span`
    ${font.text};
    color: ${props => props.color};
    margin-top: auto;
`;
