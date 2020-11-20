import styled from 'styled-components'
import {color, cursor} from "../../../Styles";

export const ImageSelectorContainer = styled.div`
    height: 50vw;
    width: 80vw;
    display: flex;
    flex-wrap: wrap;
    background-color: ${color.BG0};
    overflow-y: auto;
`;

export const ImageThumbnailContainer = styled.div`
    background-color: ${color.BG1};
    padding: 1vw;
    margin-right: 10px;
    margin-bottom: 10px;
    ${cursor.clickable};
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: ${color.BG2};
    }
`;

export const ImageThumbnail = styled.div`
    height: calc(14px + 8vw);
    width: calc(14px + 8vw);
    background: url(${props => props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;