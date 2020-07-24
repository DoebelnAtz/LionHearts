import styled from "styled-components";
import { font } from "../../Styles";

export const NavBarDiv = styled.div`
  width: 100%;
  position: fixed;
  display: flex;
`;


export const NavBarLinksDiv = styled.div`
    margin: 0 auto;
`;

export const NavBarLink = styled.span`
    color: white;
    ${font.DCBold};
    padding: 10px;
`;
