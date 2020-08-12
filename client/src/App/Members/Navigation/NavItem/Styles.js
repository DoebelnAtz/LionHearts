import styled from "styled-components";
import {font, color, cursor, units} from "../../../../Styles";

export const NavItemDiv = styled.div`
    width: calc(100% - ${units.margin});
    background-color: ${color.BG0};
    ${cursor.clickable};
    &:hover {
        transition: background-color 0.1s;
        background-color: ${color.tertiary};
    }
    height: 50px;
`;

export const NavItemIcon = styled.div`

`;

export const NavItemTitle = styled.span`
    ${font.DCBold};
    color: ${color.primary};
    ${cursor.clickable};
    font-size: 34px;
    line-height: 60px;
`;
