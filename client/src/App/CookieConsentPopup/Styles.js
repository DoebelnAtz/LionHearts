import styled from 'styled-components'
import {color, components, font, units} from "../../Styles";

export const CookieConsentContainer = styled.div`
    width: 50vw;
    background-color: ${color.BG0} ;
    padding: 5%;
    @media(max-width: ${units.mobile}) {
      width: 70vw;
      
    } 
`;

export const CookieConsentContent = styled.div`
    width: calc(90%);
`;

export const CookieConsentExplanationDiv = styled.div`
    ${font.RReg};
    line-height: 1.5em;
    margin: 20px 0 50px 0;
`;

export const CookieConsentOptionRow = styled.div`
    display: flex;
    width: 100%;
    margin: 50px 0 20px 0;
`;

export const CookieConsentList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const CookieLabel = styled.label`
    width: 100%;
    ${font.RReg};
    display: flex;
    margin: ${units.margin} 0;
`;

export const CookieOptionMandatory = styled.input`
    margin: auto ${units.margin} auto auto;
    height: 16px;
    width: 16px;
    
`;

export const CookieOptionOptional = styled.input`
    margin: auto ${units.margin} auto auto;
        height: 16px;
    width: 16px;

`;

export const CookieConsentAgreeButton = styled.button`
    ${components.buttonBlue};
    height: 38px;
    line-height: 38px;
    border-color: ${color.primary};
    margin: 0 auto;
    width: 140px;
`;

export const CookieConsentRejectButton = styled.button`
    ${components.buttonWhite};
    margin: 0 auto;
    width: 120px;
    border-color: ${color.BG5};
    color: ${color.BG5};
`;