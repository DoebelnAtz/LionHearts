import styled from "styled-components";
import {color, font} from "../../../Styles";

export const NewsSectionDiv = styled.div`
      max-height: 500px;
      height: 100%;
      width: 100%;
      border-top: 1px solid ${color.primary};
      background-color: ${color.tertiary};
`;

export const NewsListDiv = styled.div`
    max-width: 1600px;
    width: 80%;
    margin: auto 100px;
`

export const NewsHeader = styled.h1`
      ${font.DCBold};
      color: ${color.primary};
      font-size: 96px;
`;