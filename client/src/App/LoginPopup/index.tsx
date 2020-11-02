import React, {
	ChangeEvent,
	SyntheticEvent,
	useRef,
	useState,
} from 'react';
import axios from 'axios';
import Modal from '../Components/Modal';
import { useDismiss } from '../../Hooks';
import { useHistory } from 'react-router-dom';
import {
	ButtonDiv,
	LoginDiv,
	LoginForm,
	LoginInfo,
	LoginInfoDiv,
	LoginLogo,
} from './Styles';
import { setLocal } from '../../Utils';
import { AnimatedLabeledInputDiv } from '../../Styles';
import Logo from '../Logo';
import { url } from '../../config';
import LoadingButton from '../Components/LoadingButton';

const LoginPopup = () => {
	const loginModal = useRef<HTMLDivElement>(null);
	const history = useHistory();
	useDismiss(loginModal, () => {
		history.push('/');
	});

	const [input, setInput] = useState({
		username: '',
		password: '',
	});

	const handleLogin = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			let resp = await axios({
				url: `${url}/api/auth/login`,
				method: 'POST',
				data: {
					username: input.username,
					password: input.password,
				},
			});
			if (resp?.data) {
				setLocal('user', {
					token: resp.data.token,
					user: resp.data.user,
					refreshToken: resp.data.refreshToken,
				});
				history.push('/members/list');
			}
		} catch (e) {
			if (e.response.status === 401) {
				console.log('invalid credentials');
			}
			console.log(e);
			return false;
		}
		return true;
	};

	const handleUsernameChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		setInput({
			...input,
			username: target.value,
		});
	};

	const handlePasswordChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		setInput({
			...input,
			password: target.value,
		});
	};

	return (
		<Modal
			inside={loginModal}
			close={() => {
				history.push('/');
			}}
		>
			<LoginDiv>
				<LoginLogo>
					<Logo
						height={'calc(20px + 6vw)'}
						inverse
					/>
				</LoginLogo>
				<LoginInfoDiv>
					<LoginInfo>
						Log in using your member account
					</LoginInfo>
				</LoginInfoDiv>
				<LoginForm>
					<AnimatedLabeledInputDiv>
						<input
							name={'username'}
							autoComplete={'off'}
							value={input.username}
							onChange={handleUsernameChange}
							type={'text'}
							required
						/>
						<label htmlFor={'username'}>
							<span>Username</span>
						</label>
					</AnimatedLabeledInputDiv>
					<AnimatedLabeledInputDiv>
						<input
							name={'password'}
							autoComplete={'password'}
							value={input.password}
							onChange={handlePasswordChange}
							type={'password'}
							required
						/>
						<label htmlFor={'password'}>
							<span>Password</span>
						</label>
					</AnimatedLabeledInputDiv>
					<ButtonDiv>
						<LoadingButton
							onClick={handleLogin}
						>
							Log in
						</LoadingButton>
					</ButtonDiv>
				</LoginForm>
			</LoginDiv>
		</Modal>
	);
};

export default LoginPopup;
