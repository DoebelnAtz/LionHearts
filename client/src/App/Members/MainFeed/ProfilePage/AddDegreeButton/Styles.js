import styled from 'styled-components';
import { useSpring, animated as a } from 'react-spring'
import {color, cursor, font} from "../../../../../Styles";


export const AddDegreeButtonDiv = styled.div`
    width: 150px;
    margin-right: 10px;
    display: flex;
    position: relative;
    height: 21px;
    margin-bottom: 10px;
`;

export const AddDegreeSideOne = styled(a.div)`
  position: absolute;
  background-color: ${color.primary};
  display: flex;
  width: 130px;
  padding: 2px 10px;
  ${cursor.clickable};
      border-radius: 12px/14px;
  will-change: transform, opacity;
`;

export const TextSpan = styled.span`
   ${font.DCBold};
     white-space: nowrap;
  line-height: 20px;
  padding-top: 2px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  color: ${color.BG0};
  text-align: center;
  text-transform: lowercase;
  margin: auto;
  
`;

export const AddDegreeSideTwo = styled(a.div)`
    position: absolute;
  width: 150px;
  display: flex;
      border-radius: 12px/14px;
  padding: 0;
  height: 26px;
  ${cursor.clickable};
  overflow: hidden;
  will-change: transform, opacity;
`;

export const AddDegreeSideTwoHalve = styled.div`
    width: calc(50%);
    text-align: center;
    padding-top: 4px;
    background-color: ${color.primary};
    &:hover {
    background-color: ${color.primaryShade};
    }
`;
