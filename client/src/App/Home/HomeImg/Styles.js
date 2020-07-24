import styled from "styled-components";
import { color } from "../../../Styles";

export const ImgDiv = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(${color.primary}, 0.2);
`;

export const BGImg = styled.div`
  max-height: 700px;
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;