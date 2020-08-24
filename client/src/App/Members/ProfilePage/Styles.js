import styled from "styled-components";
import {color, cursor, font, units} from "../../../Styles";

export const ProfilePageDiv = styled.div`
    height: 100%;
    width: 100%;
`;

export const ProfilePageInfo = styled.div`
    display: flex;
    background-color: ${color.tertiary};
    padding: 5%;
`;

export const ProfilePageEditButtons = styled.div`
    margin-left: auto;
    display: flex;
`;


export const EditProfileButton = styled.div`
    background-image: url("${props => props.url}");
    height: 20px;
    z-index: 3;
    
    background-position: center;
    background-size: contain;
    width: 20px;
    border-bottom: 2px solid ${color.tertiary};
    ${cursor.clickable};
    &:hover {
        border-bottom: 2px solid ${color.secondary};
        transition: border-bottom-color 0.1s;
    }
`;


export const ProfilePageNameDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto 0 auto 3vw;
`;

export const ProfilePageName = styled.span`
    ${font.DCBold};
    font-size: 38px;
    line-height: 34px;
    color: ${color.primary};
    text-transform: uppercase;
`;

export const OccupationInfoDiv = styled.div`
    
    display: flex;
    flex-direction: column;
    margin-top: ${units.margin};
`;

export const PlaceOfStudy = styled.span`
    ${font.DCBold};
    font-size: 18px;
    color: ${color.primary};
    text-transform: uppercase;
`;

export const Location = styled.div`
    ${font.DCBold};
    font-size: 18px;
    line-height: 28px;
    color: ${color.primary};
    display: flex;
    
    text-transform: uppercase;
`;

export const ProfilePageContactDiv = styled.div`
    width: 18vw;
    height: 100%;
    background-color: white;
`;

export const ContactTitle = styled.span`
    color: ${color.secondary};
    font-size: 20px;
    ${font.DCBold};
`;

export const ContactInfoDiv = styled.div`
    border-top: 2px solid ${color.secondary};
    border-bottom: 2px solid ${color.secondary};
    width: 16vw;
    padding: ${units.margin} 0;
`;

export const ContactInfo = styled.input`
    color: ${color.primary};
    ${font.DCBold};
    width: calc(100% - ${units.margin} * 1);
    height: ${props => props.disabled ? '22px' : `20px`};
    letter-spacing: 0.5px;
    margin: 5px 0;
    font-size: 14px;
    border: ${props => props.disabled ? 'none' : `1px solid ${color.primary}`};
    background-color: ${props => props.disabled ? 'none' : `${color.tertiary}`};
`;

export const ProfilePageContent = styled.div`
    padding: 5%;
    display: flex;
`;

export const ProfilePageBioDiv = styled.div`
    margin-left: 3vw;
    width: 100%;
`;

export const ProfilePageBioTitle = styled.span`
    ${font.DCBold};
    font-size: 20px;
    color: ${color.primary};
`;

export const ProfilePageBio = styled.p`
    ${font.RReg};
    font-size: 14px;
`;

export const ProfilePictureDiv = styled.div`
    height: min(16vw, 200px);
    display: flex;
    width: min(16vw, 200px);
`;
