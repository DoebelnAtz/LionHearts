import styled from "styled-components";
import {font, color} from "../../../../../Styles";

export const SummaryColumnDiv = styled.div`
    padding: 2vw;
    width: ${props => props.isMobile ? '80%' : '33%'};
`;

export const SummaryColumnTitle = styled.h2`
    ${font.DCBold};
    color: ${color.primary};
    font-size: 40px;
    text-align: center;
    padding: 0;
    margin: 0;
    line-height: 40px;
`;

export const SummaryColumnText = styled.p`
    ${font.RReg};
    text-align: center;
    line-height: 30px;
    letter-spacing: 0.5px;
    font-size: 20px;
`;
