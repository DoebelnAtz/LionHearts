import React, { ChangeEvent, useEffect, useState } from 'react';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router';

import {
	ApplicantInfo,
	ApplicantInfoDiv,
	ApplicantLabel,
	LionheartsLogo,
	LionheartsLogoDiv,
	SignupDiv,
	SignupDivContainer,
	SignupForm,
} from './Styles';
import LionHeartsLogo from '../../assets/images/logo_complete_blue.svg';
import { makeRequest } from '../../Api';
import { Application } from '../../Types';
import { useGet } from '../../Hooks';

const Signup: React.FC = () => {
	const history = useHistory();
	const location = useLocation();

	const applicationId: any =
		queryString.parse(location.search)?.id || history.push(`/`);

	const [application, setApplication] = useGet<Application>(
		`/auth/signup/check_auth?id=${applicationId}`,
	);

	const [input, setInput] = useState({
		email: '',
		phone: '',
		password: '',
		passwordConfirmation: '',
	});

	const handlePhoneChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;

		setInput({
			...input,
			phone: target.value,
		});
	};

	const handlePasswordChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;

		setInput({
			...input,
			password: target.value,
		});
	};

	const handlePasswordConfirmationChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;

		setInput({
			...input,
			passwordConfirmation: target.value,
		});
	};

	const handleSignup = async (e: any) => {
		e.preventDefault();
		if (
			!!input.phone.length &&
			!!input.email.length &&
			!!input.password.length &&
			application
		) {
			console.log(input);

			try {
				await makeRequest('/auth/signup', 'POST', {
					firstname: application.firstname,
					lastname: application.lastname,
					email: application.email,
					password: input.password,
				});
			} catch (e) {
				console.log(e);
			}
		}
	};

	return (
		<SignupDiv>
			{application && (
				<SignupDivContainer>
					<LionheartsLogoDiv>
						<LionheartsLogo src={LionHeartsLogo} />
					</LionheartsLogoDiv>
					<ApplicantInfoDiv>
						<ApplicantLabel>Firstname:</ApplicantLabel>
						<ApplicantInfo>{application?.firstname}</ApplicantInfo>
					</ApplicantInfoDiv>
					<ApplicantInfoDiv>
						<ApplicantLabel>Lastname:</ApplicantLabel>
						<ApplicantInfo>{application?.lastname}</ApplicantInfo>
					</ApplicantInfoDiv>
					<ApplicantInfoDiv>
						<ApplicantLabel>Username:</ApplicantLabel>
						<ApplicantInfo>
							{application?.firstname +
								application?.lastname.charAt(0)}
						</ApplicantInfo>
					</ApplicantInfoDiv>
					<ApplicantInfoDiv>
						<ApplicantLabel>Email:</ApplicantLabel>
						<ApplicantInfo>{application?.email}</ApplicantInfo>
					</ApplicantInfoDiv>

					<SignupForm>
						<form>
							<input
								autoComplete={'new-password'}
								type={'phone'}
								placeholder={'phone'}
								value={input.phone}
								onChange={handlePhoneChange}
							/>
							<input
								autoComplete={'new-password'}
								type={'password'}
								placeholder={'password'}
								value={input.password}
								onChange={handlePasswordChange}
							/>
							<input
								autoComplete={'new-password'}
								type={'password'}
								placeholder={'confirm password'}
								value={input.passwordConfirmation}
								onChange={handlePasswordConfirmationChange}
							/>
							<button onClick={handleSignup}>Signup</button>
						</form>
					</SignupForm>
				</SignupDivContainer>
			)}
		</SignupDiv>
	);
};

export default Signup;
