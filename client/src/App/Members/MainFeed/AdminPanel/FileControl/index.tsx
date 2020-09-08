import React from 'react';
import { useGet } from '../../../../../Hooks';
import { url } from '../../../../../config.json';
import {
	CopyImageHtml,
	FileControlDiv,
	ImagePreview,
	ImagePreviewCard,
	ImagePreviewCardName,
} from './Styles';
const FileControl: React.FC = () => {
	const [fileNames, setFileNames] = useGet<string[]>('/files/photos');

	const renderFiles = () => {
		const handleCopyCodeClick = async (img: string) => {
			try {
				await navigator.clipboard.writeText(
					`<img src="${url}/api/photos/${img}"/>`,
				);
			} catch (e) {
				console.log('failed to copy to clipboard');
			}
		};

		return (
			fileNames &&
			fileNames.map((file, index) => {
				return (
					<ImagePreviewCard key={index}>
						<ImagePreview
							src={`${url}/api/photos/${file}`}
							alt={file}
						/>
						<ImagePreviewCardName>{file}</ImagePreviewCardName>
						<CopyImageHtml
							onClick={() => handleCopyCodeClick(file)}
						>
							COPY HTML
						</CopyImageHtml>
					</ImagePreviewCard>
				);
			})
		);
	};

	return <FileControlDiv>{renderFiles()}</FileControlDiv>;
};

export default FileControl;
