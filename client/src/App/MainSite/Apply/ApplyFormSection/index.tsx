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

const acceptedTypes = [
	'image/jpeg',
	'image/png',
	'application/pdf',
	'application/msword',
];
const fileSizeLimit = 100000;

const ApplyFormSection: React.FC = () => {
	const location = useLocation();
	const history = useHistory();
	const applicationId: any =
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
				} else {
					setErrors({
						...errors,
						fileError: 'File already added',
					});
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			setErrors({
				...errors,
				fileError: `File size exceeds ${
					fileSizeLimit / 1000
				}kb`,
			});
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
			} catch (e) {
				if (
					e.response.data.code === 2 ||
					e.response.data.code === 3
				) {
					history.push(
						`/apply?application=${makeId(15)}`,
					);
				} else if (e.response.data.code === 1) {
					setErrors({
						...errors,
						emailError:
							'This email has already been used',
					});
				}
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

	console.log(!selectedFile || !!errors.fileError.length);

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
							Fill in your contact details on
							the right
						</InstructionListItem>
						<InstructionListItem>
							Share with us why you would like
							to be a Lionheart. We have one
							guiding question: If you know
							you would succeed, which
							challenge you would solve right
							now?
						</InstructionListItem>
						<InstructionListItem>
							Send us your thoughts wrapped in
							a motivational letter, together
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
							well-appointed dialogue. We want
							to get to know you as much as
							you want to get to know us.
						</InstructionListItem>
						<InstructionListItem>
							If we both get excited and think
							it’s a great match, you become a
							Lionheart!
						</InstructionListItem>
						<InstructionListItem>
							You will get your Lionhearts
							member account and after setting
							up your profile, you can start
							joining our events, contributing
							to projects that are relevant to
							many, and building a community
							that celebrates diverse views
							over dogmas.
						</InstructionListItem>
					</InstructionList>
				</ApplyTextDiv>
				<ApplyMemberProfilesDiv>
					{renderMemberProfiles()}
				</ApplyMemberProfilesDiv>
				<FormDiv>
					<ApplyForm>
						<label>
							First name
							<input
								type={'text'}
								placeholder={'firstname'}
								value={input.firstname}
								onChange={handleFNameChange}
							/>
							<FormError>
								{errors.FNError}
							</FormError>
						</label>
						<label>
							Last name
							<input
								type={'text'}
								placeholder={'lastname'}
								value={input.lastname}
								onChange={handleLNameChange}
							/>
							<FormError>
								{errors.LNError}
							</FormError>
						</label>
						<label>
							Email address
							<input
								type={'email'}
								placeholder={'email'}
								value={input.email}
								onChange={handleEmailChange}
							/>
							<FormError>
								{errors.emailError}
							</FormError>
						</label>
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
						<button
							disabled={
								!selectedFile ||
								!!errors.fileError.length
							}
							onClick={handleFileUpload}
						>
							UPLOAD FILE
						</button>
						{!!uploadedFiles?.length && (
							<p>Uploaded files:</p>
						)}
						{renderUploadedFiles()}
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
						<button
							type={'submit'}
							onClick={handleSubmit}
						>
							SUBMIT
						</button>
					</ApplyForm>
				</FormDiv>
			</ApplyFormSectionDiv>
		</ApplyContentDiv>
	);
};

export default ApplyFormSection;
