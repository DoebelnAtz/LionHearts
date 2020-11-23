import styled from 'styled-components'
import {color, components, units} from "../../Styles";

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
    
`;

export const CookieConsentOptionRow = styled.div`
    display: flex;
    width: 100%;
`;

export const CookieConsentList = styled.div`
    width: 100%;
`;

export const CookieOption = styled.input`
    
`;

export const CookieConsentAgreeButton = styled.button`
    ${components.buttonBlue};
    border-color: ${color.primary};
    margin: 0 auto;
    width: 120px;
`;

export const CookieConsentRejectButton = styled.button`
    ${components.buttonWhite};
    margin: 0 auto;
    width: 120px;
    border-color: ${color.BG5};
    color: ${color.BG5};
`;