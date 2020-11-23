import styled from 'styled-components';

import {
	color,
	components,
	cursor,
	font,
	units,
} from '../../../../Styles';

export const ApplyContentDiv = styled.div`
	border-top: 10px solid ${color.secondary};
	background-color: ${color.BG0};
	width: 100%;
	display: flex;
`;

export const ApplyFormSectionDiv = styled.div`
	width: calc(100% - min(10vw, 100px) * 2);
	margin: 30px min(10vw, 100px);
	background-color: ${color.BG0};
	display: flex;
		flex-direction: column;
	@media (max-width: 900px) {
	}
`;

export const ApplyTextDiv = styled.div`
	width: 100%;
	@media (max-width: 900px) {
		width: 100%;
	}
`;

export const InstructionList = styled.ol`
    
    padding: 0;
    margin-left: 20px;
`;

export const InstructionListItem = styled.li`
    ${font.RCReg};
    font-size: 18px;
    line-height: 2em;
    margin-bottom: 2em;
    letter-spacing: 1px;
`;


export const ApplyMemberProfilesDiv = styled.div`
    width: 100%;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    @media (max-width: 900px) {
    	flex-direction: column;
    }
`;

export const MemberProfileCard = styled.div`
    width: calc(50% - 10px);
    background-color: ${color.tertiary};
    margin-right: 20px;
    height: fit-content;
    margin-bottom: 6vh;
    border-radius: 10px;
    flex-shrink: 0;
    &:nth-child(even) {
    margin-right: 0;
    }
    @media (max-width: 900px) {
    margin-right: 0;
    	width: calc(100%);
    }
`;

export const MemberProfileCardPicture = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 30px auto;
    background: url(${props => props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const MemberProfileText = styled.p`
    ${font.RCReg};
    width: 80%;
    margin: 30px auto 30px auto;
    font-size: 18px;
    line-height: 1.5em;
    text-align: center;
`;

export const ApplyHeader = styled.h2`
	${font.VItalic};
	margin-top: 0;
	text-decoration: underline;
	text-decoration-color: ${color.tertiary};
	color: ${color.primary};
	font-size: 36px;
	@media (max-width: 900px) {
		font-size: calc(16px + 2vw);
	}
`;

export const FormDiv = styled.div`
	width: 100%;
	margin: ${units.margin} 0 auto auto;
	display: flex;
	flex-direction: column;
	@media (max-width: 900px) {
		width: 100%;
	}
`;

export const FormError = styled.p`
	${font.error};
	font-size: 14px !important;
`;

export const RemoveFileSpan = styled.span`
	font-size: 18px;
	${cursor.clickable};
	& :hover {
		text-decoration: underline !important;
		text-decoration-color: ${color.primary};
	}
`;

export const UploadedFilesDiv = styled.div`
	display: flex;
	${font.text};
	margin-bottom: 5px;
`;

export const LegalCheckBox = styled.input`
	margin: auto 5px auto 0;
`;

export const LegalRow = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: ${units.margin} 0;
`;

export const LegalCheckDiv = styled.div``;

export const LegalCheckTitle = styled.span`
	${font.RReg};
	font-size: 12px;
`;

export const LegalLink = styled.a`
	text-decoration: none;
	${font.RBold};
	color: ${color.primary};
	font-size: 12px;
	&:visited {
		color: ${color.primary};
	}
`;


export const ApplyForm = styled.form`
	display: flex;
	flex-direction: column;
	& label {
		${components.labeledInput};
		& input {
		margin-top: 1em;
		margin-bottom: 1.5em;
		height: 24px;
		}
		& textarea {
		margin-top: 1em;
		margin-bottom: 1.5em;
		height: 64px;
		}
	}
	& button {
		${components.buttonWhite};
		margin-bottom: 10px;
	}
	& p {
		${font.text};
		margin: 5px 0;
	}
`;
