import React, { ChangeEvent, useRef, useState } from 'react';
import Modal from '../Components/Modal';
import { useDismiss } from '../../Hooks';
import { useHistory } from 'react-router-dom';
import {
	ButtonDiv,
	LoginButton,
	LoginDiv,
	PasswordDiv,
	UsernameDiv,
} from './Styles';
import { makeRequest } from '../../Api';
import { setLocal } from '../../Utils';
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

	const handleLogin = async () => {
		try {
			let resp = await makeRequest('/auth/login', 'post', {
				username: input.username,
				password: input.password,
			});
			if (resp?.data) {
				setLocal('user', {
					token: resp.data.token,
					user: resp.data.user,
					refreshToken: resp.data.refreshToken,
				});
			}
		} catch (e) {
			console.log(e);
		}
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
				<UsernameDiv>
					<label>
						Username
						<input
							placeholder={'username'}
							value={input.username}
							onChange={handleUsernameChange}
						/>
					</label>
				</UsernameDiv>
				<PasswordDiv>
					<label>
						Password
						<input
							value={input.password}
							onChange={handlePasswordChange}
							placeholder={'password'}
							type={'password'}
						/>
					</label>
				</PasswordDiv>
				<ButtonDiv>
					<LoginButton onClick={handleLogin}>Login</LoginButton>
				</ButtonDiv>
			</LoginDiv>
		</Modal>
	);
};

export default LoginPopup;
