import styled from "styled-components";
import { font } from "../../Styles";

export const NavBarDiv = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  display: flex;
`;

export const NavBarLogoDiv = styled.div`
  margin: auto 0 auto 0;
  position: relative;
  left: 100px;
`;

export const NavBarLinksDiv = styled.div`
    margin: auto auto;
    position: relative;
    right: 100px;
`;

export const NavBarLink = styled.span`
    color: white;
    ${font.DCBold};
    padding: 2vw;
`;
