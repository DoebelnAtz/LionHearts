import styled from "styled-components";
import { font, color } from "../../Styles";

export const NavBarDiv = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
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
`;

export const NavBarMemberIcon = styled.div`
  margin: auto 0;
  position: relative;
  right: 100px;
`;

export const NavBarLink = styled.span`
    color: ${props => props.inverse ? `${color.primary}` :`${color.BG0}`};
    ${font.DCBold};
    font-size: 20px;
    padding: 0 2vw;
    & a {
         color: ${props => props.inverse ? `${color.primary}` :`${color.BG0}`};;
         text-decoration: none;
    }
`;
