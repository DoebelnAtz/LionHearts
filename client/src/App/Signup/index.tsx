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
	PasswordStrengthMeterDiv,
	PasswordStrengthMeterBarLowest,
	PasswordStrengthMeterBarExcellent,
	PasswordStrengthMeterBarGood,
	PasswordStrengthMeterBarLow,
} from './Styles';
import LionHeartsLogo from '../../assets/images/logo_complete_blue.svg';
import { makeRequest } from '../../Api';
import { Application } from '../../@types';
import { useGet } from '../../Hooks';
import LoadingButton from '../Components/LoadingButton';
import { AnimatedLabeledInputDiv } from '../../Styles';
import placeHolderPic from '../../assets/images/profile_placeholder.png';
import { eventGA } from '../../Utils/GoogleAnalytics';

const acceptedTypes = ['image/jpeg', 'image/png'];
const imageSizeLimit = 5000000;

const Signup: React.FC = () => {
	const history = useHistory();
	const location = useLocation();
	const [
		passwordStrength,
		setPasswordStrength,
	] = useState(1);
	const [
		passwordConfStrength,
		setPasswordConfStrength,
	] = useState(1);
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
		setErrors({
			...errors,
			phoneError: '',
		});
	};

	const handlePasswordChange = (e: ChangeEvent) => {
		let value = (e.target as HTMLInputElement).value;

		if (value.length < 4) {
			setPasswordStrength(1);
		} else if (value.length < 7) {
			setPasswordStrength(2);
		} else if (value.length < 9) {
			setPasswordStrength(3);
		} else if (value.length >= 10) {
			setPasswordStrength(4);
		}

		setInput({
			...input,
			password: value,
		});
		setErrors({
			...errors,
			passError: '',
		});
	};

	const handlePasswordConfirmationChange = (
		e: ChangeEvent,
	) => {
		let value = (e.target as HTMLInputElement).value;

		if (value.length < 4) {
			setPasswordConfStrength(1);
		} else if (value.length < 7) {
			setPasswordConfStrength(2);
		} else if (value.length < 9) {
			setPasswordConfStrength(3);
		} else if (value.length >= 10) {
			setPasswordConfStrength(4);
		}

		setInput({
			...input,
			passwordConfirmation: value,
		});
		setErrors({
			...errors,
			confError: '',
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
					input.passwordConfirmation &&
				passwordStrength > 2
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
						eventGA(
							'member-event',
							'signup',
							'signup',
							100,
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
				if (
					input.password !==
					input.passwordConfirmation
				) {
					setErrors({
						...errors,
						passError: "password doesn't match",
						confError: "password doesn't match",
					});
				} else if (passwordStrength < 3) {
					setErrors({
						...errors,
						passError:
							'password needs to be >= 7 characters long',
						confError:
							'password needs to be >= 7 characters long',
					});
				}
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
			<SignupDivContainer>
				<LionheartsLogoDiv>
					<LionheartsLogo src={LionHeartsLogo} />
				</LionheartsLogoDiv>
				{application ? (
					<>
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
								{application?.username}
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
					</>
				) : (
					'loading'
				)}
				<ProfilePicUploadDiv>
					<ProfilePicPreview
						src={
							selectedFile
								? URL.createObjectURL(
										selectedFile,
								  )
								: placeHolderPic
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
								onChange={handlePhoneChange}
								type={'tel'}
								required
							/>
							<label htmlFor={'phone'}>
								<span>Phone number</span>
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
						<PasswordStrengthMeterDiv>
							<PasswordStrengthMeterBarLowest
								level={passwordStrength}
							/>
							<PasswordStrengthMeterBarLow
								level={passwordStrength}
							/>
							<PasswordStrengthMeterBarGood
								level={passwordStrength}
							/>

							<PasswordStrengthMeterBarExcellent
								level={passwordStrength}
							/>
						</PasswordStrengthMeterDiv>
						<ErrorSpan>
							{errors.passError}
						</ErrorSpan>
						<AnimatedLabeledSignupInput>
							<input
								autoComplete={
									'new-password'
								}
								type={'password'}
								name={'confirm-password'}
								value={
									input.passwordConfirmation
								}
								onChange={
									handlePasswordConfirmationChange
								}
								required
							/>
							<label
								htmlFor={'confirm-password'}
							>
								<span>
									Confirm Password
								</span>
							</label>
						</AnimatedLabeledSignupInput>
						<PasswordStrengthMeterDiv>
							<PasswordStrengthMeterBarLowest
								level={passwordConfStrength}
							/>
							<PasswordStrengthMeterBarLow
								level={passwordConfStrength}
							/>
							<PasswordStrengthMeterBarGood
								level={passwordConfStrength}
							/>

							<PasswordStrengthMeterBarExcellent
								level={passwordConfStrength}
							/>
						</PasswordStrengthMeterDiv>
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
		</SignupDiv>
	);
};

export default Signup;
