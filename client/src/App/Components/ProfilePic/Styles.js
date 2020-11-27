import styled from "styled-components";
import {color, font} from "../../../Styles";

export const ProfilePictureContainer = styled.div`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    position: relative;
    flex-direction: column;
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
    position: absolute;
    bottom: -25px;
    left: calc(50% - 36px);
    margin: 0 auto;
    width: 64px;
    transform: translateY(-14px);
    padding: 0 4px;
    background-color: ${color.secondary};
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
    font-size: 18px;
    padding-top: 1px;
    color: ${color.BG0};
    margin: auto auto auto auto;
`;