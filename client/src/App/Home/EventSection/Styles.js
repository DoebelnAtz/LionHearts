import styled from "styled-components";
import {color, font} from "../../../Styles";

export const EventSectionDiv = styled.div`
      max-height: 500px;
      height: 100%;
      width: 100%;
      border-top: 5px solid ${color.secondary};
      background-color: #ffffff;
`;

export const EventListDiv = styled.div`
    max-width: 1600px;
    width: 80%;
    margin: auto auto;
`

export const EventsHeader = styled.h1`
      ${font.DCBold};
      color: ${color.primary};
      font-size: 96px;
`;
