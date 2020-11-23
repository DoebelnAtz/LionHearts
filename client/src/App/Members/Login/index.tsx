import React, {
	ChangeEvent,
	SyntheticEvent,
	useState,
} from 'react';
import { url } from '../../../config';
import { setLocal } from '../../../Utils';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
	ButtonDiv,
	LoginDiv,
	LoginForm,
	LoginInfo,
	LoginInfoDiv,
	LoginLogo,
} from '../../LoginPopup/Styles';
import Logo from '../../Logo';
import { AnimatedLabeledInputDiv } from '../../../Styles';
import LoadingButton from '../../Components/LoadingButton';
import {
	BackToFrontPage,
	MemberLoginContainer,
	MemberLoginDiv,
	MemberLoginFormContainer,
} from './Styles';
import { eventGA } from '../../../Utils/GoogleAnalytics';
import LoginBG from '../../../assets/images/login_BG.jpg';

const MemberLogin: React.FC = () => {
	const [input, setInput] = useState({
		username: '',
		password: '',
	});
	const history = useHistory();

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
				eventGA(
					'member-event',
					'login',
					'login',
					100,
				);

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

	const handleHomeClick = (e: MouseEvent) => {
		e.preventDefault();
		history.push('/');
	};

	return (
		<MemberLoginDiv src={LoginBG}>
			<MemberLoginContainer>
				<MemberLoginFormContainer>
					<LoginDiv>
						<LoginLogo>
							<Logo
								height={'calc(20px + 6vw)'}
								inverse
							/>
						</LoginLogo>
						<LoginInfoDiv>
							<LoginInfo>
								Log in using your member
								account
							</LoginInfo>
						</LoginInfoDiv>
						<LoginForm>
							<AnimatedLabeledInputDiv>
								<input
									name={'username'}
									autoComplete={'off'}
									value={input.username}
									onChange={
										handleUsernameChange
									}
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
									autoComplete={
										'password'
									}
									value={input.password}
									onChange={
										handlePasswordChange
									}
									type={'password'}
									required
								/>
								<label htmlFor={'password'}>
									<span>Password</span>
								</label>
							</AnimatedLabeledInputDiv>
							<ButtonDiv>
								<BackToFrontPage
									onClick={
										handleHomeClick
									}
								>
									Home
								</BackToFrontPage>
								<LoadingButton
									onClick={handleLogin}
								>
									Log in
								</LoadingButton>
							</ButtonDiv>
						</LoginForm>
					</LoginDiv>
				</MemberLoginFormContainer>
			</MemberLoginContainer>
		</MemberLoginDiv>
	);
};

export default MemberLogin;
