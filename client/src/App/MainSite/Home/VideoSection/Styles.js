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
`;

export const VideoPlayerControlsRow = styled.div`
    display: flex;
    margin-top: ${units.margin};
    justify-content: center;
`;

export const VideoPlayer = styled.video`
    &:focus {
    outline: none;
    border: none;
    }
`;