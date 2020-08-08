import styled from "styled-components";
import {color, font} from "../../../Styles";

export const EventSectionDiv = styled.div`
      max-height: 500px;
      height: 100%;
      width: 100%;
      border-top: 5px solid ${color.primary};
      background-color: #ffffff;
`;

export const EventListDiv = styled.div`
    max-width: 1600px;
    width: 80%;
    margin: auto min(10vw, 100px);
`;

export const EventsHeader = styled.h1`
      ${font.DCBold};
      color: ${color.primary};
      width: 40vw;
      font-size: min(96px, 16vw);
`;
