import React, { useState } from 'react';
import { ApplyForm, ApplyFormSectionDiv, FormDiv } from './Styles';
import { makeRequest } from '../../../Api';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const ApplyFormSection: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File>();
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

	const handleFileChange = (event: any) => {
		console.log(event.target.files);
		setSelectedFile(event.target.files[0]);
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
				setUploadedFiles([...uploadedFiles, selectedFile]);
			} catch (e) {}
		}
	};

	const renderUploadedFiles = () => {
		return uploadedFiles.map((file: any, index) => {
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
