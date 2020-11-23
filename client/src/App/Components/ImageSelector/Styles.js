import styled from 'styled-components'
import {color, cursor, units} from "../../../Styles";

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
    margin: 10px;
    height: fit-content;
    ${cursor.clickable};
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: ${color.BG2};
    }
`;

export const ImageThumbnail = styled.div`
    height: calc(17vw - 20px);
    width: calc(17vw - 20px);
    background: url(${props => props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    @media(max-width: ${units.mobile}) {
      height: calc(36vw - 20px);
    width: calc(36vw - 20px);
    }
`;