import styled from "styled-components";
import {font, color, cursor, units} from "../../../../Styles";
import {Link} from "react-router-dom";

export const NavItemDiv = styled.div`
    width: calc(100% - ${units.margin});
    background-color: ${color.BG0};
    ${cursor.clickable};
    display: flex;
    &:hover {
        transition: background-color 0.1s;
        background-color: ${color.tertiary};
    }
    height: 50px;
`;

export const NavItemIcon = styled.div`
    margin: auto ${units.margin} auto 0;
    height: 30px;
    & img {
        height: 30px;
    }
`;

export const NavItemTitle = styled(Link)`
    ${font.DCBold};
    color: ${color.primary};
    ${cursor.clickable};
    font-size: 34px;
    line-height: 60px;
    text-decoration: none;
`;
