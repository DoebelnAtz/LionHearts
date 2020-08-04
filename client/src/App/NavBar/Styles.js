import styled from "styled-components";
import {font, color, cursor} from "../../Styles";

export const NavBarDiv = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
  display: flex;
`;

export const NavBarLogoDiv = styled.div`
  margin: ${props => props.isMobile ? 'auto': 'auto 0 auto 0'};
  position: relative;
  left: 100px;
`;

export const NavBarLinksDiv = styled.div`
    margin: auto auto;
    position: relative;
`;

export const NavBarMemberIcon = styled.div`
  margin: auto 0 auto auto;
  position: relative;
  right: ${props => props.isMobile ? '0' : '100px'};
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

export const MenuBtnDiv = styled.div`
    position: relative;
    margin: auto 0;
    ${cursor.clickable};
    left: 100px;
`;

export const BurgerTopDiv = styled.div`
    width: 30px;
    height: 3px;
    border-radius: 1px;
    transform: translateY(-4px);
    background-color: white;
`;

export const BurgerMidDiv = styled.div`
    width: 30px;
    height: 3px;
    border-radius: 1px;
    background-color: white;
`;

export const BurgerBotDiv = styled.div`
    width: 30px;
    height: 3px;
    border-radius: 1px;
    transform: translateY(4px);
    background-color: white;
`;
