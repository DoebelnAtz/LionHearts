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
	padding: ${units.margin};
	margin: auto;
	display: flex;
	flex-direction: column;
`;

export const SignupForm = styled.div`
	& form {
		display: flex;
		flex-direction: column;
		& input {
			${components.input};
			margin: 10px 0;
			padding: 5px;
		}
		& button {
			${components.buttonWhite};
		}
	}
`;

export const LionheartsLogoDiv = styled.div`
	width: 100%;
`;

export const LionheartsLogo = styled.img``;

export const ProfilePicUploadDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
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
	color: ${color.primary};
`;

export const ApplicantInfo = styled.span`
	margin-left: auto;
	${font.DCBold};
	color: ${color.primary};
`;
