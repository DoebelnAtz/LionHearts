import React, { ChangeEvent, useState } from 'react';
import {
	ApplyForm,
	ApplyFormSectionDiv,
	FormDiv,
	FormError,
	RemoveFileSpan,
	UploadedFilesDiv,
} from './Styles';
import { makeRequest } from '../../../Api';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import { useGet } from '../../../Hooks';
import { makeId } from '../../../Utils';

const ApplyFormSection: React.FC = () => {
	const location = useLocation();
	const history = useHistory();
	const applicationId: any =
		queryString.parse(location.search)?.application ||
		history.push(`/apply?application=${makeId(15)}`);

	const [selectedFile, setSelectedFile] = useState<File>();
	// const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

	const [uploadedFiles, setUploadedFiles] = useGet<File[]>(
		`/files/${applicationId}`,
	);

	const [input, setInput] = useState({
		email: '',
		firstname: '',
		lastname: '',
		description: '',
	});

	const [errors, setErrors] = useState({
		emailError: '',
		FNError: '',
		LNError: '',
		descriptionError: '',
		fileError: '',
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
	const handleFileChange = (event: any) => {
		setSelectedFile(event.target.files[0]);
		// @ts-ignore
		console.log(!!selectedFile, selectedFile?.size > 50000);
		console.log(selectedFile?.size);
		if (!!selectedFile && selectedFile.size > 50000) {
			setErrors({ ...errors, fileError: 'File size exceeds 50kb' });
		} else {
			setErrors({ ...errors, fileError: '' });
		}
	};

	const handleFileUpload = async (e: any) => {
		e.preventDefault();
		const data = new FormData();
		console.log(selectedFile);
		if (!!selectedFile && selectedFile.size < 50000) {
			data.append('file', selectedFile);
			try {
				await makeRequest(
					`/files/upload-file/${applicationId}`,
					'POST',
					data,
				);
				if (
					!!uploadedFiles &&
					!uploadedFiles.find(
						(file) => file.name === selectedFile.name,
					)
				) {
					setUploadedFiles([...uploadedFiles, selectedFile]);
				} else {
					setErrors({ ...errors, fileError: 'File already added' });
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			setErrors({ ...errors, fileError: 'File size exceeds 50kb' });
		}
	};

	const handleFileRemoval = async (e: any, fileName: string) => {
		e.stopPropagation();
		try {
			await makeRequest('/files/delete-file', 'DELETE', {
				applicationId,
				fileName,
			});
			uploadedFiles &&
				setUploadedFiles(
					uploadedFiles.filter((file) => file.name !== fileName),
				);
		} catch (e) {
			console.log(e);
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
								handleFileRemoval(e, file.name)
							}
						>
							remove file
						</RemoveFileSpan>
					</UploadedFilesDiv>
				);
			});
		}
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (
			input.email.length &&
			input.firstname.length &&
			input.lastname.length &&
			input.description.length
		) {
			try {
				await makeRequest('/files/create_application', 'POST', {
					applicationId: applicationId,
					firstname: input.firstname,
					lastname: input.lastname,
					email: input.email,
					description: input.description,
				});
			} catch (e) {
				console.log(e.response);
				if (e.response.data.code === 2 || e.response.data.code === 3) {
					history.push(`/apply?application=${makeId(15)}`);
				} else if (e.response.data.code === 1) {
					setErrors({
						...errors,
						emailError: 'This email has already been used',
					});
				}
			}
		} else {
			setErrors({
				...errors,
				FNError: input.firstname.length ? '' : 'Firstname required',
				LNError: input.lastname.length ? '' : 'Lastname required',
				emailError: input.email.length ? '' : 'Email required',
				descriptionError: input.description.length
					? ''
					: 'Description required',
			});
		}
	};

	return (
		<ApplyFormSectionDiv>
			<FormDiv>
				<ApplyForm>
					<label>
						Firstname
						<input
							type={'text'}
							placeholder={'firstname'}
							value={input.firstname}
							onChange={handleFNameChange}
						/>
						<FormError>{errors.FNError}</FormError>
					</label>
					<label>
						Lastname
						<input
							type={'text'}
							placeholder={'lastname'}
							value={input.lastname}
							onChange={handleLNameChange}
						/>
						<FormError>{errors.LNError}</FormError>
					</label>
					<label>
						Email address
						<input
							type={'email'}
							placeholder={'email'}
							value={input.email}
							onChange={handleEmailChange}
						/>
						<FormError>{errors.emailError}</FormError>
					</label>
					<label>
						Why do you want to join Lionhearts?
						<textarea
							value={input.description}
							onChange={handleDescriptionChange}
						/>
						<FormError>{errors.descriptionError}</FormError>
					</label>

					<label>
						Attach files
						<input type={'file'} onChange={handleFileChange} />
						<FormError>{errors.fileError}</FormError>
					</label>
					<button disabled={!selectedFile} onClick={handleFileUpload}>
						UPLOAD FILE
					</button>
					{!!uploadedFiles?.length && <p>Uploaded files:</p>}
					{renderUploadedFiles()}
					<button type={'submit'} onClick={handleSubmit}>
						SUBMIT
					</button>
				</ApplyForm>
			</FormDiv>
		</ApplyFormSectionDiv>
	);
};

export default ApplyFormSection;
