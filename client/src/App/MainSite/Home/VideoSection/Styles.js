import styled from "styled-components";
import {color, units} from "../../../../Styles";

export const VideoSectionContainer = styled.div`
    width: 100%;
    display: flex;
    background-color: ${color.secondary};
`;

export const VideoPlayerContainer = styled.div`
    width: 80%;
    margin: 5% auto;
    max-width: 800px;
`;

export const VideoPlayerControlsRow = styled.div`
    display: flex;
    margin-top: ${units.margin};
    justify-content: center;
`;

export const VideoPlayerDiv = styled.div`

`;

export const VideoPlayer = styled.video`
background-color: ${color.BG0};
    &:focus {
    outline: none;
    border: none;
    }
`;