import React, {
	ChangeEvent,
	SyntheticEvent,
	useEffect,
	useState,
} from 'react';
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
	ProfilePicUploadDiv,
	SignupDiv,
	SignupDivContainer,
	AnimatedLabeledSignupInput,
	SignupForm,
} from './Styles';
import LionHeartsLogo from '../../assets/images/logo_complete_blue.svg';
import { makeRequest } from '../../Api';
import { Application } from '../../@types';
import { useGet } from '../../Hooks';
import LoadingButton from '../Components/LoadingButton';
import { AnimatedLabeledInputDiv } from '../../Styles';

const acceptedTypes = ['image/jpeg', 'image/png'];
const imageSizeLimit = 5000000;

const Signup: React.FC = () => {
	const history = useHistory();
	const location = useLocation();
	const [selectedFile, setSelectedFile] = useState<
		File
	>();
	const applicationId: any =
		queryString.parse(location.search)?.id ||
		history.push(`/`);

	const [application, setApplication] = useGet<
		Application
	>(`/auth/signup/check_auth?id=${applicationId}`);
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

	const handlePasswordConfirmationChange = (
		e: ChangeEvent,
	) => {
		let target = e.target as HTMLInputElement;

		setInput({
			...input,
			passwordConfirmation: target.value,
		});
	};

	const handleFileUpload = async (event: any) => {
		const data = new FormData();

		if (
			!!selectedFile &&
			selectedFile.size < imageSizeLimit &&
			application
		) {
			data.append('file', selectedFile);
			try {
				await makeRequest(
					`/files/upload-profile-picture`,
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
			application
		) {
			if (
				input.password ===
				input.passwordConfirmation
			) {
				if (selectedFile) {
					try {
						await handleFileUpload(event);
						await makeRequest(
							'/auth/signup',
							'POST',
							{
								firstname:
									application.firstname,
								lastname:
									application.lastname,
								email: application.email,
								password: input.password,
								phone: input.phone,
								profilePic:
									selectedFile.name,
								applicationId:
									application.application_id,
							},
						);
						history.push('/members/login');
					} catch (e) {
						return false;
					}
				} else {
					setErrors({
						...errors,
						fileError: 'required',
					});
				}
			} else {
				setErrors({
					...errors,
					passError: "password doesn't match",
					confError: "password doesn't match",
				});
				return false;
			}
		} else {
			setErrors({
				...errors,
				phoneError: !input.phone.length
					? 'required'
					: '',
				passError: !input.password.length
					? 'required'
					: '',
			});
			return false;
		}
		return true;
	};
	const handleFileChange = (files: FileList) => {
		let targetFile = files[0];

		if (targetFile) {
			if (targetFile.size > imageSizeLimit) {
				setErrors({
					...errors,
					fileError: `File size exceeds ${
						imageSizeLimit / 1000000
					}mb`,
				});
			} else if (
				!acceptedTypes.includes(targetFile.type)
			) {
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
						<LionheartsLogo
							src={LionHeartsLogo}
						/>
					</LionheartsLogoDiv>
					<ApplicantInfoDiv>
						<ApplicantLabel>
							Firstname:
						</ApplicantLabel>
						<ApplicantInfo>
							{application?.firstname}
						</ApplicantInfo>
					</ApplicantInfoDiv>
					<ApplicantInfoDiv>
						<ApplicantLabel>
							Lastname:
						</ApplicantLabel>
						<ApplicantInfo>
							{application?.lastname}
						</ApplicantInfo>
					</ApplicantInfoDiv>
					<ApplicantInfoDiv>
						<ApplicantLabel>
							Username:
						</ApplicantLabel>
						<ApplicantInfo>
							{(
								application?.firstname.trim() +
								application?.lastname.charAt(
									0,
								)
							)
								.toLowerCase()
								.trim()}
						</ApplicantInfo>
					</ApplicantInfoDiv>
					<ApplicantInfoDiv>
						<ApplicantLabel>
							Email:
						</ApplicantLabel>
						<ApplicantInfo>
							{application?.email}
						</ApplicantInfo>
					</ApplicantInfoDiv>
					<ProfilePicUploadDiv>
						<ProfilePicPreview
							src={
								selectedFile &&
								URL.createObjectURL(
									selectedFile,
								)
							}
						/>
						<label>
							Profile picture:
							<ProfilePicInput
								type={'file'}
								onChange={(e: any) =>
									handleFileChange(
										e.target.files,
									)
								}
							/>
						</label>
						<ErrorSpan>
							{errors.fileError}
						</ErrorSpan>
					</ProfilePicUploadDiv>
					<SignupForm>
						<form autoComplete={'off'}>
							<AnimatedLabeledSignupInput>
								<input
									name={'phone'}
									autoComplete={'off'}
									value={input.phone}
									onChange={
										handlePhoneChange
									}
									type={'tel'}
									required
								/>
								<label htmlFor={'phone'}>
									<span>
										Phone number
									</span>
								</label>
							</AnimatedLabeledSignupInput>
							<ErrorSpan>
								{errors.phoneError}
							</ErrorSpan>
							<AnimatedLabeledSignupInput>
								<input
									autoComplete={
										'new-password'
									}
									type={'password'}
									value={input.password}
									onChange={
										handlePasswordChange
									}
									required
								/>
								<label htmlFor={'password'}>
									<span>Password</span>
								</label>
							</AnimatedLabeledSignupInput>
							<ErrorSpan>
								{errors.passError}
							</ErrorSpan>
							<AnimatedLabeledSignupInput>
								<input
									autoComplete={
										'new-password'
									}
									type={'password'}
									name={
										'confirm-password'
									}
									value={
										input.passwordConfirmation
									}
									onChange={
										handlePasswordConfirmationChange
									}
									required
								/>
								<label
									htmlFor={
										'confirm-password'
									}
								>
									<span>
										Confirm Password
									</span>
								</label>
							</AnimatedLabeledSignupInput>
							<ErrorSpan>
								{errors.confError}
							</ErrorSpan>
							<LoadingButton
								onClick={handleSignup}
							>
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
