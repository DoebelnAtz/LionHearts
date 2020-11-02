import styled from 'styled-components';
import { animated } from 'react-spring';
import {
	components,
	layout,
	font,
	color,
} from '../../Styles';

export const LoginDiv = styled(animated.div)`
	max-width: 400px;
	width: 50vw;
	display: flex;
	padding: 10px;
	background-color: ${color.BG0};
	overflow: hidden;
	flex-direction: column;
`;

export const LoginLogo = styled.div`
	width: 100%;
	margin-bottom: 20px;
	margin-top: 30px;
`;

export const LoginForm = styled.form`
	width: 100%;
	max-width: 240px;
	margin: 0 auto;
`;

export const LoginInfoDiv = styled.div`
	width: 70%;
	margin: auto;
	text-align: center;
`;

export const LoginInfo = styled.p`
	${font.VItalic};
	color: ${color.text};
	font-size: 20px;
`;

export const UsernameDiv = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	margin: 0 auto;
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

export const PasswordDiv = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	margin: 0 auto;
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

export const ButtonDiv = styled.div`
	width: 100%;
	${layout.row};
	margin: 20px auto 20px auto;
	& button {
		margin: 0 auto;
	}
`;
