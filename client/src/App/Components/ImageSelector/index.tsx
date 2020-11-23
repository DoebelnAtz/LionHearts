import React, { useRef } from 'react';
import {
	ImageSelectorContainer,
	ImageThumbnail,
	ImageThumbnailContainer,
} from './Styles';
import Modal from '../Modal';
import { useDismiss } from '../../../Hooks';

type ImageSelectorProps = {
	srcList: { link: string; name: string }[];
	onSelect: (selectedImage: string) => void;
	setShow: (newVal: boolean) => void;
};

const ImageSelector: React.FC<ImageSelectorProps> = ({
	srcList,
	onSelect,
	setShow,
}) => {
	const close = () => setShow(false);

	const inside = useRef<HTMLDivElement>(null);
	useDismiss(inside, close);
	const renderImages = () =>
		srcList.map((src, index) => (
			<ImageThumbnailContainer>
				<ImageThumbnail
					key={index}
					onClick={() => onSelect(src.link)}
					src={src.link}
				/>
			</ImageThumbnailContainer>
		));

	return (
		<Modal close={close} inside={inside}>
			<ImageSelectorContainer ref={inside}>
				{renderImages()}
			</ImageSelectorContainer>
		</Modal>
	);
};

export default ImageSelector;
