import styled from 'styled-components';
import {
	color,
	colorAdjust,
	components,
	cursor,
	font,
	units,
} from '../../../../Styles';
import { animated } from 'react-spring';

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
    background-image: url("${(props) => props.url}");
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
	height: ${(props) => (props.disabled ? '22px' : `20px`)};
	letter-spacing: 0.5px;
	margin: 5px 0;
	font-size: 14px;
	border: ${(props) =>
		props.disabled ? 'none' : `1px solid ${color.primary}`};
	background-color: ${(props) =>
		props.disabled ? 'none' : `${color.tertiary}`};
`;

export const ProfilePageContent = styled.div`
	padding: 5%;
	height: 50%;
	display: flex;
`;

export const ProfilePageBioSkillsDiv = styled.div`
	margin-left: 3vw;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const ProfilePageBioTitle = styled.span`
	${font.DCBold};
	font-size: 20px;
	color: ${color.primary};
`;

export const ProfilePageBio = styled.div`
	margin-bottom: ${units.margin};
`;

export const ProfilePageSkillsTitle = styled.span`
	${font.DCBold};
	font-size: 20px;
	color: ${color.primary};
`;

export const ProfilePageSkillsDiv = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

export const SkillDiv = styled.div`
	background-color: ${color.tertiary};
	border-radius: 4px;
	margin: 0 ${units.margin} ${units.margin} 0;
	padding: 2px 5px;
`;

export const CreateSkillDiv = styled.div`
	background-color: ${(props) =>
		props.disabled
			? colorAdjust.lighten(color.tertiary, 0.03)
			: color.tertiary};
	border-radius: 4px;
	${(props) => (props.disabled ? cursor.notAllowed : cursor.clickable)};
	margin-right: ${units.margin};
	padding: 2px 5px;
	&:hover {
		background-color: ${(props) =>
			props.disabled
				? colorAdjust.lighten(color.tertiary, 0.03)
				: color.tertiaryShade};
		transition: background-color 0.1s;
	}
`;
export const SkillResults = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;

	margin-top: ${units.margin};
`;

export const AddSkillDiv = styled.div`
	width: 100%;
	display: flex;
`;

export const AddSkillHeader = styled.span`
	${font.DCBold};
	color: ${color.primary};
	font-size: 20px;
`;

export const AddSkillButton = styled(animated.div)`
	background-color: ${color.tertiary};
	border: 1px solid ${color.tertiary};
	transition: border-radius 4s;
	padding: 2px 0;
	width: 34px;
	text-align: center;
	${cursor.clickable};
	&:hover {
		border-color: ${color.tertiaryShade};
		background-color: ${color.tertiaryShade};
		transition: background-color 0.1s;
	}
`;

export const AddSkillInput = styled(animated.input)`
	width: 0;
	${components.input};
	border-radius: 0 4px 4px 0;
`;

export const SkillTitle = styled.span`
	color: ${color.primary};
	${font.DCBold};
`;

export const ProfilePictureDiv = styled.div`
	height: min(16vw, 200px);
	display: flex;
	width: min(16vw, 200px);
`;
