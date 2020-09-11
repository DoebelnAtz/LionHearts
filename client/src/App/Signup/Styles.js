import styled from 'styled-components';
import { font, color, units, components } from '../../Styles';

export const SignupDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;

export const SignupDivContainer = styled.div`
	width: min(50%, 400px);
	background-color: ${color.BG0};
	padding: 5%;
	border-radius: 10px;
	margin: auto;
	display: flex;
	flex-direction: column;
`;

export const SignupForm = styled.div`
	& form {
		display: flex;
		flex-direction: column;

		& button {
			margin-top: ${units.margin};
			${components.buttonWhite};
		}
	}
`;

export const LionheartsLogoDiv = styled.div`
	width: 100%;
	margin: 5% 0;
`;

export const LionheartsLogo = styled.img``;

export const ProfilePicUploadDiv = styled.div`
	width: 100%;
	margin-top: 5%;
	display: flex;
	flex-direction: column;
	& label {
		${font.DCBold};
		color: ${color.header};
		font-size: 18px;
	}
`;

export const ErrorSpan = styled.span`
	color: red;
	${font.RBold};
`;

export const ProfilePicInput = styled.input`
	${components.input};
	padding: 5px;
	margin-bottom: 5px;
	width: calc(100% - ${units.margin});
`;

export const ProfilePicPreview = styled.img`
	width: 40%;
	height: 40%;
	border-radius: 50%;
	margin: 0 auto;
`;

export const ProfilePicUploadButton = styled.button`
	width: 100%;
	${components.buttonWhite};
`;

export const ApplicantInfoDiv = styled.div`
	width: 100%;
	margin-bottom: ${units.margin};
	display: flex;
`;

export const ApplicantLabel = styled.span`
	${font.DCBold};
	color: ${color.header};
	font-size: 18px;
`;

export const ApplicantInfo = styled.span`
	margin-left: auto;
	${font.DCBold};
	font-size: 18px;
	color: ${color.primary};
`;
