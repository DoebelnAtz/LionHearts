import React from 'react';
import { ProfilePicture } from './Styles';
import { url } from '../../../config.json';
const ProfilePic: React.FC<{ src: string }> = ({ src }) => {
	return (
		<ProfilePicture
			src={`${url}/api/files/profile_picture?fileName=${src}`}
		/>
	);
};

export default ProfilePic;
