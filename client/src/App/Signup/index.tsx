import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router';

import {
	ApplicantInfo,
	ApplicantInfoDiv,
	ApplicantLabel,
	ErrorSpan,
	LionheartsLogo,
	LionheartsLogoDiv,
	ProfilePicInput,
	ProfilePicPreview,
	ProfilePicUploadButton,
	ProfilePicUploadDiv,
	SignupDiv,
	SignupDivContainer,
	SignupForm,
} from './Styles';
import LionHeartsLogo from '../../assets/images/logo_complete_blue.svg';
import { makeRequest } from '../../Api';
import { Application } from '../../@types';
import { useGet } from '../../Hooks';
import LoadingButton from '../Components/LoadingButton';
import { AnimatedLabeledInputDiv } from '../../Styles';

const acceptedTypes = ['image/jpeg', 'image/png'];

const Signup: React.FC = () => {
	const history = useHistory();
	const location = useLocation();
	const [selectedFile, setSelectedFile] = useState<File>();
	const applicationId: any =
		queryString.parse(location.search)?.id || history.push(`/`);

	const [application, setApplication] = useGet<Application>(
		`/auth/signup/check_auth?id=${applicationId}`,
	);
	const [errors, setErrors] = useState({
		passError: '',
		confError: '',
		phoneError: '',
		fileError: '',
	});

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

	const handleFileUpload = async (event: any) => {
		const data = new FormData();

		if (!!selectedFile && selectedFile.size < 80000 && application) {
			data.append('file', selectedFile);
			try {
				await makeRequest(
					`/files/upload-file/profile-pictures/${(
						application.firstname + application.lastname.charAt(0)
					).toLowerCase()}`,
					'POST',
					data,
				);
			} catch (e) {
				console.log(e);
			}
		} else {
		}
	};

	const handleSignup = async (event: any) => {
		event.preventDefault();
		if (
			!!input.phone.length &&
			!!input.password.length &&
			input.password === input.passwordConfirmation &&
			application &&
			selectedFile
		) {


			try {
				await handleFileUpload(event);
				await makeRequest('/auth/signup', 'POST', {
					firstname: application.firstname,
					lastname: application.lastname,
					email: application.email,
					password: input.password,
					phone: input.phone,
					profilePic: selectedFile.name,
					applicationId: application.application_id,
				});
			} catch (e) {
				console.log(e);
				return false;
			}
		}
		return true;
	};
	const handleFileChange = (files: FileList) => {
		let targetFile = files[0];

		if (targetFile) {
			if (targetFile.size > 80000) {
				setErrors({
					...errors,
					fileError: 'File size exceeds 80kb',
				});
			} else if (!acceptedTypes.includes(targetFile.type)) {
				setErrors({
					...errors,
					fileError: 'Allowed formats: jpeg, png',
				});
			} else {
				setErrors({
					...errors,
					fileError: '',
				});
				setSelectedFile(targetFile);
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
							{(
								application?.firstname +
								application?.lastname.charAt(0)
							).toLowerCase()}
						</ApplicantInfo>
					</ApplicantInfoDiv>
					<ApplicantInfoDiv>
						<ApplicantLabel>Email:</ApplicantLabel>
						<ApplicantInfo>{application?.email}</ApplicantInfo>
					</ApplicantInfoDiv>
					<ProfilePicUploadDiv>
						<ProfilePicPreview
							src={
								selectedFile &&
								URL.createObjectURL(selectedFile)
							}
						/>
						<label>
							Profile picture:
							<ProfilePicInput
								type={'file'}
								onChange={(e: any) =>
									handleFileChange(e.target.files)
								}
							/>
						</label>
						<ErrorSpan>{errors.fileError}</ErrorSpan>
					</ProfilePicUploadDiv>
					<SignupForm>
						<form>
							<AnimatedLabeledInputDiv>
								<input
									name={'phone'}
									autoComplete={'off'}
									value={input.phone}
									onChange={handlePhoneChange}
									type={'text'}
									required
								/>
								<label htmlFor={'phone'}>
									<span>Phone</span>
								</label>
							</AnimatedLabeledInputDiv>
							<AnimatedLabeledInputDiv>
								<input
									autoComplete={'new-password'}
									type={'password'}
									value={input.password}
									onChange={handlePasswordChange}
									required
								/>
								<label htmlFor={'password'}>
									<span>Password</span>
								</label>
							</AnimatedLabeledInputDiv>
							<AnimatedLabeledInputDiv>
								<input
									autoComplete={'new-password'}
									type={'password-confirmation'}
									name={'confirm-password'}
									value={input.passwordConfirmation}
									onChange={handlePasswordConfirmationChange}
									required
								/>
								<label htmlFor={'confirm-password'}>
									<span>Confirm Password</span>
								</label>
							</AnimatedLabeledInputDiv>
							<LoadingButton onClick={handleSignup}>
								Signup
							</LoadingButton>
						</form>
					</SignupForm>
				</SignupDivContainer>
			)}
		</SignupDiv>
	);
};

export default Signup;
