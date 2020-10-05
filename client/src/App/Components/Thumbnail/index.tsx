import React from 'react';
import { ThumbnailDiv } from './Styles';

const Thumbnail: React.FC<{ url: string }> = ({ url, children }) => {
	return (
		<ThumbnailDiv className={'thumbnail'} url={url}>
			{children}
		</ThumbnailDiv>
	);
};

export default Thumbnail;
