import React from 'react';
import { ThumbnailDiv } from './Styles';

const Thumbnail: React.FC<{ url: string }> = ({ url }) => {
	return <ThumbnailDiv url={url} />;
};

export default Thumbnail;
