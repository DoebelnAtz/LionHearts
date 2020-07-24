import styled from "styled-components";
import {color, colorAdjust} from "../../../Styles";

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