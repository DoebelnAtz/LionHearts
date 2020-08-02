import styled from 'styled-components';
import { color } from "../../Styles";

export const FooterDiv = styled.div`
    background-color: ${color.BG0};
    display: flex;
    height: 100px;
`;

export const FooterContentDiv = styled.div`
    max-width: 1600px;
    margin: 40px 100px;
    display: flex;
    height: 100%;
    width: 100%;

`

export const LinkDiv = styled.div`
    display: flex;
    height: 30px;
    width: 100%;
`;

export const FooterNavDiv = styled.div`
    flex-wrap: nowrap;
    display: flex;
    margin: auto;
`;

export const SoMeLinksDiv = styled.div`
    flex-wrap: nowrap;
    display: flex;
`;
