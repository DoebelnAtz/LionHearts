import React, { ChangeEvent, useRef, useState } from 'react';
import { ApplyForm, ApplyFormSectionDiv, FormDiv } from './Styles';
import { makeRequest } from '../../../Api';
import { strict } from 'assert';

const ApplyFormSection: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File>();
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const handleFileChange = (event: any) => {
		console.log(event.target.files);
		setSelectedFile(event.target.files[0]);
	};

	const handleFileUpload = async (e: any) => {
		e.preventDefault();
		const data = new FormData();
		if (!!selectedFile) {
			data.append('file', selectedFile);
			try {
				await makeRequest('/applications/upload-file', 'POST', data);
				setUploadedFiles([...uploadedFiles, selectedFile]);
				console.log(uploadedFiles);
			} catch (e) {}
		}
	};

	const renderUploadedFiles = () => {
		console.log(uploadedFiles);
		return uploadedFiles.map((file: any, index) => {
			console.log('files:');
			return (
				<div key={index}>
					<p>{file.name}</p>
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
						<input type={'text'} />
					</label>
					<label>
						Lastname
						<input type={'text'} />
					</label>
					<label>
						Email address
						<input type={'email'} />
					</label>
					<label>
						Why do you want to join Lionhearts?
						<textarea />
					</label>
					<label>
						Attached files
						<input type={'file'} onChange={handleFileChange} />
					</label>
					{renderUploadedFiles()}
					<button onClick={handleFileUpload}>UPLOAD</button>
					<button type={'submit'}>SUBMIT</button>
				</ApplyForm>
			</FormDiv>
		</ApplyFormSectionDiv>
	);
};

export default ApplyFormSection;
