import styled, { css } from 'styled-components';
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
	width: calc(90% - min(16vw, 200px));
`;

export const ProfilePageName = styled.span`
	${font.DCBold};
	font-size: 38px;
	line-height: 34px;
	color: ${color.primary};
	text-transform: uppercase;
	@media (max-width: ${units.mobile}) {
		font-size: calc(14px + 2vw);
		line-height: 20px;
	}
`;

export const OccupationInfoDiv = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: ${units.margin};
`;

export const PlaceOfStudy = styled.span`
	${font.DCBold};
	font-size: 16px;
	color: ${color.primary};
	display: flex;
	line-height: 28px;

	text-transform: uppercase;
	@media (max-width: ${units.mobile}) {
		font-size: 3vw;
		line-height: 20px;
	}
`;

export const Location = styled.div`
	${font.DCBold};
	font-size: 16px;
	line-height: 28px;
	color: ${color.primary};
	display: flex;
	text-transform: uppercase;
	@media (max-width: ${units.mobile}) {
		font-size: 3vw;
		line-height: 20px;
	}
`;

export const ProfilePageContactDiv = styled.div`
	width: 18vw;
	height: 100%;
	background-color: white;
	@media (max-width: ${units.tablet}) {
		height: auto;
		margin-bottom: ${units.margin};
		width: 100%;
		margin-top: ${units.margin};
	}
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
	display: flex;
	flex-direction: column;
	padding: ${units.margin} 0;
	@media (max-width: ${units.tablet}) {
		width: 100%;
	}
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

export const ContactLink = styled.a`
	color: ${color.primary};
	${font.DCBold};
	width: calc(100% - ${units.margin} * 1);
	height: 20px;
	letter-spacing: 0.5px;
	margin: 5px 3px;
	padding: 2px 0;
	font-size: 14px;
	text-decoration: none;
`;

export const ProfilePageContent = styled.div`
	padding: 5%;
	height: 50%;
	display: flex;
	@media (max-width: ${units.tablet}) {
		flex-direction: column-reverse;
		height: auto;
	}
`;

export const ProfilePageLanguageDiv = styled.div`
	width: 100%;
`;

export const ProfilePageLanguageTitle = styled.span`
	${font.DCBold};
	font-size: 20px;
	color: ${color.primary};
`;

export const LanguageList = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: ${units.margin} 0;
`;

export const LanguageCard = styled.div`
	margin-bottom: 5px;
	margin-right: ${units.margin};
	display: flex;
	flex-direction: column;
`;

export const LanguageIcon = styled.div`
	height: 50px;
	width: 50px;
	background: url(${(props) => props.url});
	background-position: center;
	background-size: cover;
	background-color: ${color.BG3};
	border-radius: 50%;
	background-repeat: no-repeat;
	@media (max-width: ${units.mobile}) {
		height: 40px;
		width: 40px;
	}
`;

export const LanguageTitle = styled.span`
	${font.DCBold};
	font-size: 14px;
	margin: 5px auto;
	color: ${color.primary};
`;

export const RemoveLangSpan = styled.span`
	${font.DCBold};
	font-size: 12px;
	margin: 5px auto;
	${cursor.clickable};
	color: ${color.primary};
`;

export const ProfilePageBioSkillsDiv = styled.div`
	margin-left: 3vw;
	width: 100%;
	display: flex;
	flex-direction: column;
	@media (max-width: ${units.tablet}) {
		height: auto;
		margin-left: 0;
	}
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

export const SkillTitle = styled.span`
	color: ${color.primary};
	padding-top: 4px;
	font-size: 16px;
	line-height: 16px;
	${font.DCBold};
`;

export const SkillDiv = styled.div`
	background-color: ${color.tertiary};
	border-radius: 4px;
	margin: 0 ${units.margin} ${units.margin} 0;
	padding: 2px 7px;
	&:hover {
	 & ${SkillTitle} {
		${(props) =>
			props.removable
				? `text-decoration: line-through; ${cursor.clickable}`
				: ''}
	
	};
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
	${components.input};
	border-radius: 0 4px 4px 0;
`;

export const ProfilePictureDiv = styled.div`
	height: min(16vw, 200px);
	display: flex;
	width: min(16vw, 200px);
`;
