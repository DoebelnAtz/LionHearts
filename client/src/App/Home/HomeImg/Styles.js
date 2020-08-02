import styled from "styled-components";
import {color, font} from "../../../Styles";

export const ImgDiv = styled.div`
  height: 100%;
  width: 100%;
`;

export const BGImg = styled.div`
  max-height: 570px;
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.src});
  background-color: ${color.primary};
  background-blend-mode: multiply;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Vision = styled.h1`
    ${font.DCBold};
    font-size: 96px;
    position: relative;
    left: 100px;
    top: 240px;
    margin: 0;
    width: calc(100% - 100px);
    color: white;
`;
