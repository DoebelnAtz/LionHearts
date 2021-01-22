import React, { ChangeEvent, useState } from 'react';
import {
	ApplyContentDiv,
	ApplyForm,
	ApplyFormSectionDiv,
	ApplyHeader,
	ApplyMemberProfilesDiv,
	ApplyTextDiv,
	FormDiv,
	FormError,
	FormInputContainer,
	InstructionList,
	InstructionListItem,
	LegalCheckBox,
	LegalCheckDiv,
	LegalCheckTitle,
	LegalLink,
	LegalRow,
	MemberProfileCard,
	MemberProfileCardPicture,
	MemberProfileText,
	RemoveFileSpan,
	UploadedFilesContainer,
	UploadedFilesDiv,
} from './Styles';
import { makeRequest } from '../../../../Api';
import queryString from 'query-string';
import PrivacyPolicy from '../../../../assets/files/privacy-statement.pdf';
import TOS from '../../../../assets/files/tos.pdf';
import { useLocation, useHistory } from 'react-router-dom';
import { useGet } from '../../../../Hooks';
import {
	getLocal,
	makeId,
	setLocal,
} from '../../../../Utils';
import HenrikPic from '../../../../assets/images/henrikr.jpg';
import LeilahPic from '../../../../assets/images/leilah.jpg';
import { eventGA } from '../../../../Utils/GoogleAnalytics';
import LoadingButton from '../../../Components/LoadingButton';

const acceptedTypes = [
	'image/jpeg',
	'image/png',
	'application/pdf',
	'application/msword',
];
const fileSizeLimit = 5000000;

const ApplyFormSection: React.FC = () => {
	const location = useLocation();
	const history = useHistory();
	let applicationId: any =
		getLocal('application')?.applicationId ||
		setLocal('application', {
			applicationId: makeId(15),
		});

	const [selectedFile, setSelectedFile] = useState<
		File
	>();
	// const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

	const [uploadedFiles, setUploadedFiles] = useGet<
		File[]
	>(`/files/${applicationId}`);

	const [input, setInput] = useState({
		email: '',
		firstname: '',
		lastname: '',
		description: '',
		legal: false,
	});

	const [errors, setErrors] = useState({
		emailError: '',
		FNError: '',
		LNError: '',
		descriptionError: '',
		fileError: '',
		legalError: '',
	});

	const handleFNameChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;

		setInput({
			...input,
			firstname: target.value,
		});
	};

	const handleDescriptionChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;

		setInput({
			...input,
			description: target.value,
		});
	};

	const handleLNameChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;

		setInput({
			...input,
			lastname: target.value,
		});
	};

	const handleEmailChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;

		setInput({
			...input,
			email: target.value,
		});
	};
	const handleFileChange = (files: FileList) => {
		let targetFile = files[0];
		// @ts-ignore
		if (targetFile) {
			if (targetFile.size > fileSizeLimit) {
				setErrors({
					...errors,
					fileError: `File size exceeds ${
						fileSizeLimit / 1000
					}kb`,
				});
			} else if (
				!acceptedTypes.includes(targetFile.type)
			) {
				setErrors({
					...errors,
					fileError:
						'Allowed formats: .jpeg, .png, .pdf, .doc',
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

	const handleFileUpload = async (e: any) => {
		e.preventDefault();
		const data = new FormData();

		if (!input.legal) {
			setErrors({
				...errors,
				legalError: 'required',
			});
			return false;
		} else if (
			!!selectedFile &&
			selectedFile.size < fileSizeLimit
		) {
			data.append('file', selectedFile);
			try {
				await makeRequest(
					`/files/upload-application/${applicationId}`,
					'POST',
					data,
				);
				if (
					!!uploadedFiles &&
					!uploadedFiles.find(
						(file) =>
							file.name === selectedFile.name,
					)
				) {
					setUploadedFiles([
						...uploadedFiles,
						selectedFile,
					]);
					return true;
				} else {
					setErrors({
						...errors,
						fileError: 'File already added',
					});
					return false;
				}
			} catch (e) {
				console.log(e);
				return false;
			}
		} else {
			setErrors({
				...errors,
				fileError: `File size exceeds ${
					fileSizeLimit / 1000000
				}mb`,
			});
			return false;
		}
	};

	const handleFileRemoval = async (
		e: any,
		fileName: string,
	) => {
		e.stopPropagation();
		try {
			await makeRequest(
				'/files/delete-file',
				'DELETE',
				{
					applicationId,
					fileName,
				},
			);
			uploadedFiles &&
				setUploadedFiles(
					uploadedFiles.filter(
						(file) => file.name !== fileName,
					),
				);
		} catch (e) {
			console.log(e);
		}
	};

	const handleSubmit = async (
		e: React.SyntheticEvent,
	) => {
		e.preventDefault();
		if (
			input.email.length &&
			input.firstname.length &&
			input.lastname.length &&
			input.description.length &&
			input.legal
		) {
			try {
				await makeRequest(
					'/files/create_application',
					'POST',
					{
						applicationId: applicationId,
						firstname: input.firstname,
						lastname: input.lastname,
						email: input.email,
						description: input.description,
					},
				);
				eventGA(
					'application',
					'application',
					'application',
					100,
				);
				history.push('/apply/success');
				return true;
			} catch (e) {
				if (
					e.response.data.code === 2 ||
					e.response.data.code === 3
				) {
					applicationId = makeId(15);
					setLocal('application', {
						applicationId: applicationId,
					});
					setErrors({
						...errors,
						fileError:
							'An error occurred, please try again',
					});
				} else if (e.response.data.code === 1) {
					setErrors({
						...errors,
						emailError:
							'This email has already been used',
					});
				}
				return false;
			}
		} else {
			setErrors({
				...errors,
				FNError: input.firstname.length
					? ''
					: 'Firstname required',
				LNError: input.lastname.length
					? ''
					: 'Lastname required',
				emailError: input.email.length
					? ''
					: 'Email required',
				descriptionError: input.description.length
					? ''
					: 'Description required',
				legalError: input.legal ? '' : 'required',
			});
			return false;
		}
	};

	const renderUploadedFiles = () => {
		if (uploadedFiles) {
			return uploadedFiles.map((file: any, index) => {
				return (
					<UploadedFilesDiv key={index}>
						<span>{file.name}</span>
						<RemoveFileSpan
							style={{ marginLeft: 'auto' }}
							onClick={(e: any) =>
								handleFileRemoval(
									e,
									file.name,
								)
							}
						>
							remove file
						</RemoveFileSpan>
					</UploadedFilesDiv>
				);
			});
		}
	};

	const memberProfiles = [
		{
			pic: LeilahPic,
			name: 'Leila',
			text: `I’m Leila, a second-year Law student at the University of Bristol. 
			My experience growing up between two cultures – Finnish and Tunisian – has 
			instilled in me the value of enriching ourselves with a variety of perspectives. 
			When I’m not getting to grips with the latest legal reform, you can find me honing my 
			skills on the violin or outdoors enjoying a nice, hike with my sister. 
			I’m dedicated to working towards a sustainable tomorrow, and it would be a pleasure to 
			have You on the journey with us.`,
		},
		{
			pic: HenrikPic,
			name: 'Henrik',
			text: `My name is Henrik and I’m a 22-year-old Accounting and Finance 
				student at Turku School of Economics. My interests include a wide 
				range of topics from financial management to investing and from 
				journalism to politics. In my free time I am most likely on a golf 
				course, but you can also find me exercising at the gym, playing piano 
				or staring at a chessboard.`,
		},
	];

	const renderMemberProfiles = () =>
		memberProfiles.map((profile, index) => (
			<MemberProfileCard key={index}>
				<MemberProfileCardPicture
					src={profile.pic}
					alt={profile.name}
				/>
				<MemberProfileText>
					{profile.text}
				</MemberProfileText>
			</MemberProfileCard>
		));

	return (
		<ApplyContentDiv>
			<ApplyFormSectionDiv>
				<ApplyTextDiv>
					<ApplyHeader>
						GREAT THAT YOU GOT THIS FAR, TELL US
						ABOUT YOURSELF!
					</ApplyHeader>
					<InstructionList>
						<InstructionListItem>
							Fill in your contact details
							below
						</InstructionListItem>
						<InstructionListItem>
							Share with us why you would like
							to become a Lionheart. We have
							one guiding question: If you
							know you would succeed, which
							challenge would you solve right
							now?
						</InstructionListItem>
						<InstructionListItem>
							Send us your thoughts wrapped in
							a motivation letter, together
							with your CV and other optional
							attachments. Any of the main
							languages do. We do our best to
							understand.
						</InstructionListItem>
						<InstructionListItem>
							We get back to you shortly to
							schedule an interview (online or
							in-person)
						</InstructionListItem>
						<InstructionListItem>
							Let’s have the interview! Or
							it’s more like a relaxed yet
							thorough dialogue. We want to
							get to know you as much as you
							want to get to know us.
						</InstructionListItem>
						<InstructionListItem>
							If we both get excited and think
							it’s a great match, you will
							become a Lionheart!
						</InstructionListItem>
						<InstructionListItem>
							You will get your Lionhearts
							member account and after setting
							up your profile, you can start
							joining our events, contributing
							to projects that are relevant to
							many, and building a community
							that celebrates diverse views
							not dogmas.
						</InstructionListItem>
					</InstructionList>
				</ApplyTextDiv>
				<ApplyMemberProfilesDiv>
					{renderMemberProfiles()}
				</ApplyMemberProfilesDiv>
				<FormDiv>
					<ApplyForm>
						<FormInputContainer>
							<label>
								First name
								<input
									type={'text'}
									placeholder={
										'firstname'
									}
									value={input.firstname}
									onChange={
										handleFNameChange
									}
								/>
								<FormError>
									{errors.FNError}
								</FormError>
							</label>
						</FormInputContainer>
						<FormInputContainer>
							<label>
								Last name
								<input
									type={'text'}
									placeholder={'lastname'}
									value={input.lastname}
									onChange={
										handleLNameChange
									}
								/>
								<FormError>
									{errors.LNError}
								</FormError>
							</label>
						</FormInputContainer>
						<FormInputContainer>
							<label>
								Email address
								<input
									type={'email'}
									placeholder={'email'}
									value={input.email}
									onChange={
										handleEmailChange
									}
								/>
								<FormError>
									{errors.emailError}
								</FormError>
							</label>
						</FormInputContainer>
						<label>
							Why do you want to join
							Lionhearts?
							<textarea
								value={input.description}
								onChange={
									handleDescriptionChange
								}
							/>
							<FormError>
								{errors.descriptionError}
							</FormError>
						</label>

						<label>
							Attach files
							<input
								type={'file'}
								onChange={(e: any) =>
									handleFileChange(
										e.target.files,
									)
								}
							/>
							<FormError>
								{errors.fileError}
							</FormError>
						</label>
						<LoadingButton
							width={'130px'}
							disabled={
								!selectedFile ||
								!!errors.fileError.length
							}
							onClick={handleFileUpload}
						>
							UPLOAD FILE
						</LoadingButton>
						{!!uploadedFiles?.length && (
							<p>Uploaded files:</p>
						)}
						<UploadedFilesContainer>
							{renderUploadedFiles()}
						</UploadedFilesContainer>
						<LegalRow>
							<LegalCheckDiv>
								<LegalCheckBox
									value={input.legal}
									onChange={() =>
										setInput({
											...input,
											legal: !input.legal,
										})
									}
									type={'checkbox'}
								/>
								<LegalCheckTitle>
									I accept the{' '}
									<LegalLink href={TOS}>
										Terms of service
									</LegalLink>{' '}
									and{' '}
									<LegalLink
										href={PrivacyPolicy}
									>
										Privacy Policy
									</LegalLink>
								</LegalCheckTitle>
							</LegalCheckDiv>
							<FormError>
								{errors.legalError}
							</FormError>
						</LegalRow>

						<LoadingButton
							width={'130px'}
							onClick={handleSubmit}
						>
							SUBMIT
						</LoadingButton>
					</ApplyForm>
				</FormDiv>
			</ApplyFormSectionDiv>
		</ApplyContentDiv>
	);
};

export default ApplyFormSection;
