import styled from "styled-components";

import {color, font, units} from "../../../Styles";

export const MainFeedDiv = styled.div`
    width: 100%;
    height: 100%;
`;

export const MainFeedHeader = styled.div`
    width: 100%;
    display: flex;
    height: 50px;
    border-bottom: 10px solid ${color.BG1};
`;

export const MainFeedContent = styled.div`
    width: 100%;
    height: calc(100% - 10px - 50px);
`;

export const MainFeedLocation = styled.span`
    ${font.DCBold};
    font-size: 26px;
    margin: auto 0 3px ${units.margin};
    color: ${color.primary};
`;
