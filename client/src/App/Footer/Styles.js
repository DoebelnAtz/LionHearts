import styled from 'styled-components';
import { color, font, cursor } from "../../Styles";

export const FooterDiv = styled.div`
    background-color: ${color.BG0};
    display: flex;
    height: 100px;
`;

export const FooterContentDiv = styled.div`
    max-width: 1600px;
    margin: 40px min(10vw, 100px);
    display: flex;
    flex-direction: ${props => props.isMobile ? 'column' : 'row'};
    height: 100%;
    width: 100%;

`;

export const LinkDiv = styled.div`
    display: flex;
    height: 30px;
    flex-direction: ${props => props.isMobile ? 'column' : 'row'};
    width: 100%;
`;

export const FooterNavDiv = styled.div`
    flex-wrap: nowrap;
    display: flex;
    margin: ${props => props.isMobile ? 'auto auto' : 'auto auto auto 0'};
`;

export const FooterNavBarLinksDiv = styled.div`
    margin: ${props => props.isMobile ? 'auto auto' : 'auto auto auto 0'};
    position: relative;
    display: flex;
    padding-top: 10px;
    flex-direction: ${props => props.isMobile ? 'column' : 'row'};
    z-index: 3;
`;

export const FooterNavBarLink = styled.span`
    color: ${props => props.inverse ? `${color.primary}` :`${color.BG0}`};
    ${font.DCBold};
    font-size: 20px;
    z-index: 3;
    padding: ${props => props.isMobile ? '10px 0' : '0 2vw'};
    ${cursor.clickable};
    & a {
         color: ${props => props.inverse ? `${color.primary}` :`${color.BG0}`};;
         text-decoration: none;
    }
`;

export const SoMeLinksDiv = styled.div`
    flex-wrap: nowrap;
    display: flex;
`;
