import React, { ChangeEvent, useState } from 'react';
import { ApplyForm, ApplyFormSectionDiv, FormDiv } from './Styles';

const ApplyFormSection: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState(null);

	const fileChangeHandler = (event: any) => {
		console.log(event.target.files);
		setSelectedFile(event.target.files[0]);
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
						<input type={'file'} onChange={fileChangeHandler} />
					</label>
					<button type={'submit'}>SUBMIT</button>
				</ApplyForm>
			</FormDiv>
		</ApplyFormSectionDiv>
	);
};

export default ApplyFormSection;
