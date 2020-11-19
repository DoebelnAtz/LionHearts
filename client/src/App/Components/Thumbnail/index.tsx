import React from 'react';
import { ThumbnailDiv } from './Styles';
import placeholderImage from '../../../assets/images/placeholder-image.png';
const Thumbnail: React.FC<{ url: string }> = ({
	url,
	children,
}) => {
	return (
		<ThumbnailDiv
			className={'thumbnail'}
			url={url ? url : placeholderImage}
			placeholder={placeholderImage}
		>
			{children}
		</ThumbnailDiv>
	);
};

export default Thumbnail;
