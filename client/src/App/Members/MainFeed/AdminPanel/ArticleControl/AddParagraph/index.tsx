import React, {
	Dispatch,
	SetStateAction,
	useRef,
	useState,
} from 'react';
import {
	AddParagraphContainer,
	AddParagraphEditor,
	AddParagraphImage,
	AddParagraphImageInput,
	AddParagraphImageOptions,
	AddParagraphPreview,
	ParagraphOption,
	ParagraphOptionRow,
} from './Styles';
import QuillEditor from '../../../../../Components/QuillEditor';
import DropDownComponent from '../../../../../Components/DropDown';
import { Option } from '../../../../../../@types';
import { url } from '../../../../../../config';
import Thumbnail from '../../../../../Components/Thumbnail';
import ToggleButton from '../../../../../Components/ToggleButton';

type AddParagraphProps = {
	setText: (newVal: string) => void;
	text: string;
};

export const AddParagraph: React.FC<AddParagraphProps> = ({
	text,
	setText,
}) => {
	const [editing, setEditing] = useState(true);
	const [imagePlacement, setImagePlacement] = useState(
		'none',
	);

	const [selectedFile, setSelectedFile] = useState<
		File
	>();

	const [errors, setErrors] = useState({
		fileError: '',
	});

	const handlePreviewToggle = () => {
		setEditing(!editing);
	};

	const acceptedTypes = ['image/jpeg', 'image/png'];
	const sizeLimit = 100000;

	const handleFileChange = (files: FileList) => {
		let targetFile = files[0];

		if (targetFile) {
			if (targetFile.size > sizeLimit) {
				setErrors({
					...errors,
					fileError: `File size exceeds ${
						sizeLimit / 1000
					}kb`,
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

	const handleImagePlacementChange = (
		newOption: Option,
	) => {
		setImagePlacement(newOption.option);
	};
	console.log(text);
	return (
		<AddParagraphContainer>
			<AddParagraphImage>
				<Thumbnail
					url={
						selectedFile
							? URL.createObjectURL(
									selectedFile,
							  )
							: `https://storage.googleapis.com/lionhearts-images/placeholder-image.png`
					}
				/>
			</AddParagraphImage>
			<AddParagraphImageOptions>
				<ParagraphOption>
					File
					<AddParagraphImageInput
						type={'file'}
						onChange={(e: any) =>
							handleFileChange(e.target.files)
						}
					/>
				</ParagraphOption>
				<ParagraphOption>
					Placement
					<DropDownComponent
						state={imagePlacement}
						setSelect={
							handleImagePlacementChange
						}
						optionList={[
							{ option: 'none' },
							{ option: 'above' },
							{ option: 'under' },
							{ option: 'left' },
							{ option: 'right' },
						]}
					/>
				</ParagraphOption>
			</AddParagraphImageOptions>
			{editing ? (
				<AddParagraphEditor>
					<QuillEditor
						onChange={setText}
						value={text}
					/>
				</AddParagraphEditor>
			) : (
				<AddParagraphPreview
					dangerouslySetInnerHTML={{
						__html: text,
					}}
				/>
			)}
			<ParagraphOptionRow>
				<ParagraphOption>
					Preview
					<ToggleButton
						state={editing}
						setState={handlePreviewToggle}
					/>
				</ParagraphOption>
			</ParagraphOptionRow>
		</AddParagraphContainer>
	);
};
