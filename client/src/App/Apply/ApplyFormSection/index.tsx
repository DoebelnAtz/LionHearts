import React, { ChangeEvent, useState } from 'react';
import {
	ApplyForm,
	ApplyFormSectionDiv,
	FormDiv,
	FormError,
	RemoveFileSpan,
} from './Styles';
import { makeRequest } from '../../../Api';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const ApplyFormSection: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File>();
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
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
	const location = useLocation();

	const applicationId: any = queryString.parse(location.search)?.application;

	const handleFileUpload = async (e: any) => {
		e.preventDefault();
		const data = new FormData();
		console.log(selectedFile);
		if (!!selectedFile && selectedFile.size < 50000) {
			data.append('file', selectedFile);
			try {
				await makeRequest(
					`/applications/upload-file/${applicationId}`,
					'POST',
					data,
				);
				if (
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

	const handleFileRemoval = async (e: MouseEvent, fileName: string) => {
		e.stopPropagation();
		try {
			await makeRequest('/applications/delete-file', 'DELETE', {
				applicationId,
				fileName,
			});
			setUploadedFiles(
				uploadedFiles.filter((file) => file.name !== fileName),
			);
		} catch (e) {
			console.log(e);
		}
	};

	const renderUploadedFiles = () => {
		return uploadedFiles.map((file: any, index) => {
			return (
				<div style={{ display: 'flex' }} key={index}>
					<span>{file.name}</span>
					<RemoveFileSpan
						style={{ marginLeft: 'auto' }}
						onClick={(e: any) => handleFileRemoval(e, file.name)}
					>
						remove file
					</RemoveFileSpan>
				</div>
			);
		});
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
					</label>
					<label>
						Lastname
						<input
							type={'text'}
							placeholder={'lastname'}
							value={input.lastname}
							onChange={handleLNameChange}
						/>
					</label>
					<label>
						Email address
						<input
							type={'email'}
							placeholder={'email'}
							value={input.email}
							onChange={handleEmailChange}
						/>
					</label>
					<label>
						Why do you want to join Lionhearts?
						<textarea
							value={input.description}
							onChange={handleDescriptionChange}
						/>
					</label>
					<label>
						Attached files
						{renderUploadedFiles()}
						<input type={'file'} onChange={handleFileChange} />
						<FormError>{errors.fileError}</FormError>
					</label>
					<button disabled={!selectedFile} onClick={handleFileUpload}>
						UPLOAD
					</button>
					<button type={'submit'}>SUBMIT</button>
				</ApplyForm>
			</FormDiv>
		</ApplyFormSectionDiv>
	);
};

export default ApplyFormSection;
