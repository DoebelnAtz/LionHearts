import styled from 'styled-components';

import { color, components, cursor, font, units } from '../../../../Styles';

export const ApplyContentDiv = styled.div`
	border-top: 10px solid ${color.secondary};
	width: 100%;
	display: flex;
`;

export const ApplyFormSectionDiv = styled.div`
	width: 100%;
	margin: 30px min(10vw, 100px);
	background-color: ${color.BG0};
	display: flex;
`;

export const ApplyTextDiv = styled.div`
	width: 40%;
`;

export const ApplyHeader = styled.h2`
	${font.VItalic};
	margin-top: 0;
	text-decoration: underline;
	text-decoration-color: ${color.tertiary};
	color: ${color.primary};
	font-size: 36px;
`;

export const FormDiv = styled.div`
	width: 50%;
	margin: auto 0 auto auto;
	display: flex;
	flex-direction: column;
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
