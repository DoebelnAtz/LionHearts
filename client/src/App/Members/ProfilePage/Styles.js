import styled from "styled-components";
import {color, font, units} from "../../../Styles";

export const ProfilePageDiv = styled.div`
    height: 100%;
    width: 100%;
`;

export const ProfilePageInfo = styled.div`
    display: flex;
    
    padding: 5%;
`;

export const ProfilePageNameDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto ${units.margin};
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

export const Location = styled.span`
    ${font.DCBold};
    font-size: 18px;
    color: ${color.primary};
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

export const ContactInfo = styled.span`
    color: ${color.primary};
    ${font.DCBold};
    letter-spacing: 0.5px;
    font-size: 14px;
`;

export const ProfilePageContent = styled.div`
    padding: 5%;
    display: flex;
`;

export const ProfilePageBioDiv = styled.div`
    margin-left: ${units.margin};
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
    height: 100%;
    width: 18vw;
`;

export const ProfilePicture = styled.div`
    background-image: url("${props => props.url}");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 16vw;
    border-radius: 8vw;
    width: 16vw;
`;