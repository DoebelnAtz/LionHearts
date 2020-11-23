import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useRef,
	useState,
} from 'react';
import {
	AddParagraphContainer,
	AddParagraphEditor,
	AddParagraphImage,
	AddParagraphImageOptions,
	AddParagraphImageSizeOption,
	AddParagraphPreview,
	ParagraphOption,
	ParagraphOptionRow,
	ShowImageSelectorButton,
} from './Styles';
import QuillEditor from '../../../../../Components/QuillEditor';
import DropDownComponent from '../../../../../Components/DropDown';
import { Option } from '../../../../../../@types';
import Thumbnail from '../../../../../Components/Thumbnail';
import ToggleButton from '../../../../../Components/ToggleButton';
import ImageSelector from '../../../../../Components/ImageSelector';
import { useGet } from '../../../../../../Hooks';

type AddParagraphProps = {
	setText: (newText: string, newImage: string) => void;
	text: string;
	image: string;
};

export const AddParagraph: React.FC<AddParagraphProps> = ({
	text,
	setText,
	image,
}) => {
	const [editing, setEditing] = useState(true);
	const [imagePlacement, setImagePlacement] = useState(
		'none',
	);
	const [width, setWidth] = useState('100');
	const [height, setHeight] = useState('100');
	const [imagePreview, setImagePreview] = useState('');
	const [fileNames] = useGet<
		{ link: string; name: string }[]
	>('/files/photos');
	const [
		showImageSelector,
		setShowImageSelector,
	] = useState(false);

	const toggleImageSelector = () => {
		setShowImageSelector(!showImageSelector);
	};

	const closeImageSelector = () => {
		setShowImageSelector(false);
	};

	const handlePreviewToggle = () => {
		setEditing(!editing);
	};

	const handleHeightChange = (e: ChangeEvent) => {
		let value = (e.target as HTMLInputElement).value;
		setHeight(value);
		handleImageChange(
			imagePreview,
			imagePlacement,
			value,
			width,
		);
	};

	const handleWidthChange = (e: ChangeEvent) => {
		let value = (e.target as HTMLInputElement).value;
		setWidth(value);
		handleImageChange(
			imagePreview,
			imagePlacement,
			height,
			value,
		);
	};

	const handleTextChange = (newVal: string) => {
		setText(newVal, image);
	};

	const handleImageChange = (
		newImage: string,
		option: string = imagePlacement,
		newHeight = height,
		newWidth = width,
	) => {
		showImageSelector && closeImageSelector();
		setImagePreview(newImage);
		switch (option) {
			case 'above':
				setText(
					text,
					`<img src="${newImage}" style="width: ${
						isNaN(Number(newWidth))
							? newWidth
							: newWidth + 'px'
					}; height: ${
						isNaN(Number(newHeight))
							? newHeight
							: newHeight + 'px'
					}; margin: 20px auto; display: block">`,
				);
				break;
			case 'left':
				setText(
					text,
					`<img src="${newImage}" style="width: ${
						isNaN(Number(newWidth))
							? newWidth
							: newWidth + 'px'
					}; height: ${
						isNaN(Number(newHeight))
							? newHeight
							: newHeight + 'px'
					}; float: left; margin: 21px 20px 20px 20px;">`,
				);
				break;
			case 'right':
				setText(
					text,
					`<img src="${newImage}" style="width: ${
						isNaN(Number(newWidth))
							? newWidth
							: newWidth + 'px'
					}; height: ${
						isNaN(Number(newHeight))
							? newHeight
							: newHeight + 'px'
					}; float: right; margin: 21px 20px 20px 20pxk;">`,
				);
				break;
			default:
				setText(text, ``);
		}
	};

	const handleImagePlacementChange = (
		newOption: Option,
	) => {
		setImagePlacement(newOption.option);
		handleImageChange(imagePreview, newOption.option);
	};

	return (
		<AddParagraphContainer>
			<AddParagraphImage>
				<Thumbnail
					url={
						imagePreview ||
						`https://storage.googleapis.com/lionhearts-images/placeholder-image.png`
					}
				/>
			</AddParagraphImage>
			<AddParagraphImageOptions>
				<ParagraphOption>
					File
					<ShowImageSelectorButton
						onClick={toggleImageSelector}
					>
						Add image
					</ShowImageSelectorButton>
					{showImageSelector && fileNames && (
						<ImageSelector
							srcList={fileNames}
							onSelect={handleImageChange}
							setShow={setShowImageSelector}
						/>
					)}
				</ParagraphOption>
				<ParagraphOption>
					Height:
					<AddParagraphImageSizeOption
						value={height}
						onChange={handleHeightChange}
					/>
				</ParagraphOption>
				<ParagraphOption>
					Width:
					<AddParagraphImageSizeOption
						value={width}
						onChange={handleWidthChange}
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
							{ option: 'left' },
							{ option: 'right' },
						]}
					/>
				</ParagraphOption>
			</AddParagraphImageOptions>
			{editing ? (
				<AddParagraphEditor>
					<QuillEditor
						simple
						onChange={handleTextChange}
						value={text}
					/>
				</AddParagraphEditor>
			) : (
				<AddParagraphPreview
					dangerouslySetInnerHTML={{
						__html: image + text,
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
