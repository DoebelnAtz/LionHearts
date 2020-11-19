import React, { useState } from 'react';
import { useGet } from '../../../../../Hooks';
import { url } from '../../../../../config';
import {
	CopyImageHtml,
	FileControlDiv,
	ImagePreview,
	ImagePreviewCard,
	ImagePreviewCardName,
	UploadFileInput,
	UploadFileDiv,
	ExistingFiles,
	UploadFileButton,
	ErrorSpan,
} from './Styles';
import { makeRequest } from '../../../../../Api';
import LoadingButton from '../../../../Components/LoadingButton';

const acceptedTypes = ['image/jpeg', 'image/png'];

const FileControl: React.FC = () => {
	const [fileNames, setFileNames] = useGet<string[]>(
		'/files/photos',
	);
	const [selectedFile, setSelectedFile] = useState<
		File
	>();
	const [errors, setErrors] = useState({
		fileError: '',
	});

	const handleFileUpload = async (event: any) => {
		const data = new FormData();

		if (
			!!selectedFile &&
			selectedFile.size < 50000000
		) {
			data.append('file', selectedFile);
			try {
				await makeRequest(
					`/files/upload-file/images`,
					'POST',
					data,
				);
				return true;
			} catch (e) {
				console.log(e);
				return false;
			}
		} else {
			return false;
		}
	};
	const handleFileChange = (files: FileList) => {
		let targetFile = files[0];

		if (targetFile) {
			if (targetFile.size > 50000000) {
				setErrors({
					...errors,
					fileError: 'File size exceeds 50mb',
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

	const handleCopyCodeClick = async (img: string) => {
		try {
			await navigator.clipboard.writeText(
				`https://storage.googleapis.com/lionhearts-images/${img}`,
			);
		} catch (e) {}
	};

	const renderFiles = () => {
		return (
			fileNames &&
			fileNames.map((file, index) => {
				return (
					<ImagePreviewCard key={index}>
						<ImagePreview
							src={`https://storage.googleapis.com/lionhearts-images/${file}`}
							alt={file}
						/>
						<ImagePreviewCardName>
							{file}
						</ImagePreviewCardName>
						<CopyImageHtml
							onClick={() =>
								handleCopyCodeClick(file)
							}
						>
							COPY SRC
						</CopyImageHtml>
					</ImagePreviewCard>
				);
			})
		);
	};

	return (
		<FileControlDiv>
			<UploadFileDiv>
				<UploadFileInput
					type={'file'}
					onChange={(e: any) =>
						handleFileChange(e.target.files)
					}
				/>
				<LoadingButton onClick={handleFileUpload}>
					Upload
				</LoadingButton>
				<ErrorSpan>{errors.fileError}</ErrorSpan>
			</UploadFileDiv>
			<ExistingFiles>{renderFiles()}</ExistingFiles>
		</FileControlDiv>
	);
};

export default FileControl;
