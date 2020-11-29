import styled from 'styled-components';
import {
	font,
	color,
	units,
	components,
} from '../../Styles';

export const SignupDiv = styled.div`
	width: 100%;
	height: 100%;
	
	overflow-y: auto;
	display: flex;
	background-color: ${color.primary}70;
	background: url(${props => props.src});
	background-size: cover;
	background-repeat: no-repeat;
`;

export const SignupDivContainer = styled.div`
	width: min(50%, 400px);
	max-width: 300px;
	background-color: ${color.BG0};
	padding: min(5%, 30px);
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
	margin-top: 10px;
	${font.RBold};
	position: relative;
	z-index: 3;
`;

export const ProfilePicInput = styled.input`
	${components.input};
	padding: 5px;
	margin-bottom: 5px;
	width: calc(100% - ${units.margin});
	
`;

export const PasswordStrengthMeterDiv = styled.div`
    display: flex;
    width: 100%;
    & > div {
		margin-right: 4%;
		border-radius: 4px;
		height: 10px;
		width: 22%;

	}
	& > div:last-child {
		margin-right: 0;
	}
`;

export const PasswordStrengthMeterBarLowest = styled.div`
    background-color: ${props => 
    	props.level >= 1 ? '#ff4810' : color.BG1
    
    };
`;

export const PasswordStrengthMeterBarLow = styled.div`
    background-color: ${props => 
    	props.level >= 2 ? '#f5b634' : color.BG1
    
    };
`;

export const PasswordStrengthMeterBarGood = styled.div`
    background-color: ${props => 
    	props.level >= 3 ? '#c5ff3d' : color.BG1
    
    };
`;

export const PasswordStrengthMeterBarExcellent = styled.div`

    background-color: ${props => 
    	props.level >= 4 ? '#59ff8d' : color.BG1
    
    };
`;

export const ProfilePicPreview = styled.img`
	width: calc(10px + 8vw);
	height: calc(10px + 8vw);
	max-width: 100px;
	max-height: 100px;
	border-radius: 50%;
	background: url(${props => props.src}), ${color.BG0};
	background-position: center;
	background-repeat: no-repeat;
	background-color: ${color.BG0};
	margin: 0 auto;
`;

export const ProfilePicUploadButton = styled.button`
	width: 100%;
	${components.buttonWhite};
`;

export const AnimatedLabeledSignupInput = styled.div`
	${components.animatedLabeledInput};
	margin-bottom: 5px;
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
