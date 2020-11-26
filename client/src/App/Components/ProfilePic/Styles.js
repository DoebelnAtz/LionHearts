import styled from "styled-components";
import {color, font} from "../../../Styles";

export const ProfilePictureContainer = styled.div`
    width: 100%;
    height: 100%;
    
`;

export const ProfilePicture = styled.div`
    background-image: url("${props => props.src}"), url(${props => props.fallback});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    border-radius: 50%;
    width: 100%;
`;

export const ProfilePictureLabelContainer = styled.div`
    height: 22px;
    display: flex;
    transform: translateY(-14px);
    padding: 0 6px;
    background: radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);;
    border-radius: 10px;
`;

export const ProfilePictureLabelIcon = styled.img`
    height: 14px;
    width: 14px;
    margin: auto 3px auto auto;
`;

export const ProfilePictureLabelSpan = styled.span`
    ${font.DCBold};
    line-height: 22px;
    font-size: 16px;
    padding-top: 1px;
    color: ${color.BG0};
    margin: auto auto auto 3px;
`;