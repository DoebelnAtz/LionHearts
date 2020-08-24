import styled from "styled-components";
import {font, color, units, cursor} from "../../../../../Styles";

export const ApplicationPageDiv = styled.div`
    height: 100%;
    width: calc(100% - ${units.margin} * 2);
    display: flex;
    flex-direction: column;
`;


export const ApplicantInfoDiv = styled.div`
    width: 100%;
    margin: ${units.margin};
    display: flex;
    flex-direction: ${props => props.inline ? 'row' : 'column'};
`;

export const ApplicantInfoLabel = styled.span`
    color: ${color.primary};
    font-size: 18px;
    ${font.RBold};
`;

export const ApplicantInfo = styled.span`
    color: ${color.text};
    margin-left: auto;
    font-size: 18px;
    ${font.RReg};
`;

export const ApplicantDescription = styled.p`
    width: 100%;
    ${font.RReg};
`;

export const ApplicantName = styled.span`
    
`;

export const ApplicantFiles = styled.span`
    ${font.RReg};
    ${cursor.clickable};
    &:hover {
      color: ${color.primary};
    }
`;
